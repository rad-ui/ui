#!/usr/bin/env node
/**
 * Audits component `*.clarity.scss` against the mechanically checkable
 * enforcement rules in `knowledge/design_system/clarity_audit_spec.md`.
 *
 * This exists because the spec is written as review guidance, so every rule
 * depended on a human remembering to check it. The rules that can be decided
 * from the stylesheet alone are checked here instead, which keeps drift from
 * regenerating as components are edited.
 *
 * Rules that need a human or a rendered contrast check — WCAG ratios, whether
 * a variant contradicts its recipe, whether elevation is justified, whether
 * state is perceivable without color — are deliberately out of scope. This
 * script does not claim to prove a component is accessible.
 *
 * Usage:
 *   node scripts/clarity-audit.cjs           # human-readable report
 *   node scripts/clarity-audit.cjs --json    # machine-readable
 *
 * Exits non-zero when any unacknowledged finding exists.
 */
const fs = require('fs');
const path = require('path');

const COMPONENT_DIR = path.resolve(__dirname, '../src/components/ui');

/**
 * Findings that are known, accepted, and individually justified.
 *
 * Each entry is a finding this script would otherwise report. Keep entries
 * short and explain why the exception is correct, otherwise it is just debt
 * with a comment attached. An entry must be deleted once it is fixed — the
 * script fails on any allow-list entry that no longer matches a real finding,
 * so a stale entry cannot quietly outlive the problem it described.
 *
 * Format: `<path relative to src/components/ui>` -> `<rule>` -> reason string.
 *
 * Currently empty: every exception found during the initial audit was fixed at
 * the token layer rather than accepted here.
 */
const ALLOW_LIST = {};

/**
 * Maximum tolerated findings per rule.
 *
 * The component styles predate the alias layer, so turning this gate on
 * against a clean baseline is not possible today. Rather than leave the script
 * unwired until the backlog is clear, each rule carries the count observed when
 * the audit was introduced. CI fails only when a rule goes *above* its budget,
 * which stops new drift immediately while the existing debt is paid down.
 *
 * Lower a number as you fix findings. The gate is a ratchet, not a to-do list:
 * if a rule is not being worked on, its budget simply stays put.
 *
 * Rules absent from this map have a budget of zero, so a new rule fails on its
 * first finding. That is intentional — adding a rule should be a deliberate act.
 *
 * Regenerate with `npm run check:clarity -- --update-baseline` once the
 * remaining findings have been triaged, then delete this comment.
 */
const BASELINE = {
    'literal-spacing': 210,
    'literal-sizing': 88,
    'literal-typography': 45,
    'literal-radius': 27
};

/**
 * Property groups whose values should come from Clarity tokens.
 *
 * `anyOf` properties are reported only when the declaration contains a
 * dimension literal, which keeps `flex: 1` and `order: 2` out of the report.
 */
const TOKENISED_PROPERTIES = [
    { property: /(padding|margin)/, label: 'spacing' },
    { property: /^gap$|^row-gap$|^column-gap$/, label: 'spacing' },
    { property: /^border-radius$/, label: 'radius' },
    { property: /^font-size$/, label: 'typography' },
    { property: /^line-height$/, label: 'typography' },
    // Only block sizes are checked. The spec names control heights as the
    // tokenised case; inline `width` and layout caps such as `max-width: 72rem`
    // are component geometry rather than drift, and flagging them buries the
    // real findings.
    { property: /^(min-)?height$/, label: 'sizing' }
];

/** Matches `#abc`, `#aabbcc`, `#aabbccdd`. */
const HEX_COLOR = /#[0-9a-fA-F]{3,8}\b/;
/** Matches `rgb()`, `rgba()`, `hsl()`, `hsla()`. Excludes `var()` fallbacks. */
const COLOR_FUNCTION = /\b(?:rgb|rgba|hsl|hsla)\(/;
/** A dimension literal in px/rem/em, e.g. `1rem`, `24px`. Excludes unitless 0. */
const DIMENSION_LITERAL = /(?:^|[\s(,])(?:\d*\.)?\d+(?:px|rem|em)\b/;
/** A duration literal, e.g. `200ms`, `0.15s`. */
const DURATION_LITERAL = /(?:^|[\s(,])(?:\d*\.)?\d*m?s\b/;

/** @typedef {{ file: string, rule: string, line: number, text: string }} Finding */

/** @returns {string[]} absolute paths of every component stylesheet to audit */
function collectStyleFiles() {
    /** @type {string[]} */
    const files = [];
    for (const dir of fs.readdirSync(COMPONENT_DIR)) {
        const full = path.join(COMPONENT_DIR, dir);
        if (!fs.statSync(full).isDirectory()) continue;
        for (const file of fs.readdirSync(full)) {
            if (file.endsWith('.clarity.scss')) files.push(path.join(full, file));
        }
    }
    return files.sort();
}

/**
 * Replaces the fallback argument of every `var(--token, fallback)` with a
 * marker, so the token reference itself stops reading as a hardcoded value
 * while the literal is still available for the fallback-literal rule.
 */
function stripVarFallbacks(value) {
    return value.replace(/var\(\s*--[\w-]+\s*,([^)]*)\)/g, (_match, fallback) =>
        fallback && /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla)\(/.test(fallback)
            ? 'var(--token, FALLBACK-LITERAL)'
            : 'var(--token)'
    );
}

/** True when the declaration references any `--rad-ui-*` token. */
function usesRadUiToken(value) {
    return /var\(\s*--rad-ui-/.test(value);
}

/** True when the value is only a reset, which is never a finding. */
function isResetValue(value) {
    const trimmed = value.trim();
    return (
        trimmed === '' ||
        /^(none|0|initial|unset|revert)(;\s*)+$/.test(trimmed) ||
        /^(none|0|initial|unset|revert)$/.test(trimmed)
    );
}

/**
 * Splits a stylesheet into declarations, joining values that wrap across
 * lines. A wrapped `box-shadow:` is a single declaration, so scanning line by
 * line would report the property with an empty value and miss the literals
 * that follow it.
 *
 * Selectors, at-rules and comments are skipped. SCSS variable declarations
 * (`$open-duration: 500ms`) are kept and reported as literals, because a
 * local duration constant is the same drift as a typed-in one.
 *
 * Known limitation: a rule written entirely on one line (`.x { color: red; }`)
 * puts the selector and its first declaration on the same physical line, so
 * that declaration is not seen. The component stylesheets format declarations
 * one per line and stylelint enforces it, so this does not affect the audit in
 * practice. Reformatting such a rule is enough to make it visible.
 *
 * @param {string} source
 * @returns {{ property: string, value: string, line: number, text: string, inReducedMotion: boolean }[]}
 */
function parseDeclarations(source) {
    // Strip comments first so a commented-out declaration is never audited,
    // while keeping newlines so reported line numbers stay accurate.
    const lines = source
        // Block comments become spaces so offsets and line numbers survive.
        .replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/[^\n]/g, ' '))
        // Line comments are dropped. Without this, a declaration carrying a
        // trailing `// note` looks unterminated and swallows the next one.
        .replace(/\/\/[^\n]*/g, (comment) => comment.replace(/[^\n]/g, ' '))
        .split('\n');

    /** @type {{ property: string, value: string, line: number, text: string, inReducedMotion: boolean }[]} */
    const declarations = [];
    /** @type {{ property: string, value: string, line: number }|null} */
    let pending = null;
    let depth = 0;
    // Nesting depth of `prefers-reduced-motion: reduce` blocks, so durations
    // written to neutralise motion are not reported as interaction timings.
    let reducedMotionDepth = 0;

    lines.forEach((raw, index) => {
        const trimmed = raw.trim();
        if (!trimmed || trimmed.startsWith('//')) return;

        const opensReducedMotion = /@media[^{]*prefers-reduced-motion\s*:\s*reduce/.test(raw);
        let closesReducedMotion = false;

        for (const char of raw) {
            if (char === '{') {
                depth++;
                if (opensReducedMotion) reducedMotionDepth++;
            } else if (char === '}') {
                depth--;
                // A `}` on a line that also opens the reduced-motion query must
                // not decrement before the increment above is applied.
                if (reducedMotionDepth > 0 && !opensReducedMotion) closesReducedMotion = true;
            }
        }
        if (closesReducedMotion) reducedMotionDepth--;

        const inReducedMotion = reducedMotionDepth > 0;

        if (pending) {
            pending.value += ` ${trimmed}`;
            if (trimmed.endsWith(';')) {
                declarations.push({
                    ...pending,
                    text: `${pending.property}: ${pending.value}`.trim(),
                    inReducedMotion
                });
                pending = null;
            }
            return;
        }

        // Inside a block, only declarations matter. At the top level, skip
        // at-rules, imports and selectors. The colon is located on `trimmed`
        // because the slices below are also taken from `trimmed`; using the
        // raw line's index would shift the property name by the indent.
        const colon = trimmed.indexOf(':');
        if (colon === -1) return;
        const property = trimmed.slice(0, colon).trim();
        if (!property || property.startsWith('@')) return;
        if (depth > 0 && !/^[\w$-]/.test(property)) return;

        const value = trimmed.slice(colon + 1).trim();
        if (!value.endsWith(';')) {
            pending = { property, value, line: index + 1 };
            return;
        }
        declarations.push({ property, value, line: index + 1, text: trimmed, inReducedMotion });
    });

    if (pending) {
        declarations.push({
            ...pending,
            text: `${pending.property}: ${pending.value}`.trim(),
            inReducedMotion: reducedMotionDepth > 0
        });
    }

    return declarations;
}

/**
 * Audits one stylesheet.
 *
 * @param {string} absolutePath
 * @param {string} relativePath path relative to the component dir, used for allow-list keys
 * @returns {Finding[]}
 */
function auditFile(absolutePath, relativePath) {
    const source = fs.readFileSync(absolutePath, 'utf8');
    /** @type {Finding[]} */
    const findings = [];

    for (const { property: rawProperty, value: rawValue, line, text, inReducedMotion } of parseDeclarations(source)) {
        // An SCSS variable or map entry is styled by the same token rules as a
        // plain declaration; strip the sigil so `$foo: 500ms` reads as `foo`.
        const property = rawProperty.replace(/^\$/, '');
        const value = stripVarFallbacks(rawValue);

        // Shadow and filter declarations are judged as elevation, not as raw
        // color. A hue-tinted `box-shadow` fails the elevation rule even though
        // it happens to contain a color function, so this check must run before
        // the generic color check below.
        if (property === 'box-shadow' || property === 'filter') {
            if (property === 'filter' && !/drop-shadow/.test(value)) continue;
            if (isResetValue(value)) continue;
            if (usesRadUiToken(value)) continue;
            findings.push({
                file: relativePath,
                rule: property === 'filter' ? 'filter-drop-shadow' : 'hand-coded-shadow',
                line,
                text
            });
            continue;
        }

        // Raw colors. A `var()` whose fallback is a literal still ships a fixed
        // value to any consumer that has not loaded the token file, so it is
        // reported separately from a value with no token reference at all.
        if (/FALLBACK-LITERAL/.test(value)) {
            findings.push({ file: relativePath, rule: 'token-fallback-literal', line, text });
            continue;
        }

        if (HEX_COLOR.test(value) || COLOR_FUNCTION.test(value)) {
            findings.push({ file: relativePath, rule: 'raw-color', line, text });
            continue;
        }

        if (property === 'transition' || property === 'transition-duration' || property === 'animation') {
            if (usesRadUiToken(rawValue)) continue;
            // A zero duration disables motion rather than timing it. That is a
            // real technique — suppressing a transition so a transform can track
            // a pointer without lag — so it is never drift.
            if (/^(0m?s|0s)(?:\s*!important)?\s*;?$/.test(value.trim())) continue;
            // Two categories are not interaction durations and are not drift:
            // a looping animation's cycle time, and the near-zero duration that
            // neutralises motion inside a reduced-motion block.
            if (/\binfinite\b/.test(rawValue)) continue;
            if (inReducedMotion) continue;
            if (DURATION_LITERAL.test(value)) {
                findings.push({ file: relativePath, rule: 'literal-duration', line, text });
            }
            continue;
        }

        const group = TOKENISED_PROPERTIES.find((g) => g.property.test(property));
        if (!group) continue;
        if (usesRadUiToken(rawValue)) continue;
        if (!DIMENSION_LITERAL.test(value)) continue;

        findings.push({ file: relativePath, rule: `literal-${group.label}`, line, text });
    }

    return findings;
}

/** Drops findings covered by a justified allow-list entry. */
function applyAllowList(findings) {
    return findings.filter((f) => !ALLOW_LIST[f.file]?.[f.rule]);
}

/**
 * Allow-list entries that no longer correspond to a real finding. These are
 * reported as errors so a fixed problem cannot leave its exception behind.
 */
function staleAllowListEntries(findings) {
    const live = new Set(findings.map((f) => `${f.file}::${f.rule}`));
    return Object.entries(ALLOW_LIST).flatMap(([file, rules]) =>
        Object.keys(rules)
            .filter((rule) => !live.has(`${file}::${rule}`))
            .map((rule) => ({ file, rule, line: 0, text: `stale allow-list entry: ${rules[rule]}` }))
    );
}

/** Findings grouped by rule, then by file, for stable output. */
function groupByRule(findings) {
    const byRule = new Map();
    for (const f of findings) {
        if (!byRule.has(f.rule)) byRule.set(f.rule, new Map());
        const byFile = byRule.get(f.rule);
        if (!byFile.has(f.file)) byFile.set(f.file, []);
        byFile.get(f.file).push(f);
    }
    return [...byRule.entries()].sort((a, b) => b[1].size - a[1].size || a[0].localeCompare(b[0]));
}

/** Total finding count per rule. */
function countByRule(findings) {
    /** @type {Record<string, number>} */
    const counts = {};
    for (const f of findings) counts[f.rule] = (counts[f.rule] ?? 0) + 1;
    return counts;
}

/** Budget for a rule. Rules with no baseline entry may not have any findings. */
function budgetFor(rule) {
    return BASELINE[rule] ?? 0;
}

/**
 * Rules that exceeded their budget, i.e. genuine new drift.
 *
 * Staying *under* budget is not a failure — it just means someone fixed
 * something, and the baseline should be lowered to match.
 */
function regressions(findings) {
    const counts = countByRule(findings);
    return Object.entries(counts)
        .filter(([rule, count]) => count > budgetFor(rule))
        .map(([rule, count]) => ({ rule, count, budget: budgetFor(rule) }));
}

function run() {
    const files = collectStyleFiles();
    const all = files.flatMap((file) => auditFile(file, path.relative(COMPONENT_DIR, file)));
    const findings = applyAllowList(all);
    const stale = staleAllowListEntries(all);
    const counts = countByRule(findings);

    if (process.argv.includes('--update-baseline')) {
        const updated = Object.fromEntries(
            Object.entries(counts).sort(([a], [b]) => a.localeCompare(b))
        );
        console.log('Baseline counts to paste into BASELINE in scripts/clarity-audit.cjs:\n');
        console.log(JSON.stringify(updated, null, 4));
        return;
    }

    const over = regressions(findings);

    if (process.argv.includes('--json')) {
        process.stdout.write(`${JSON.stringify({
            filesScanned: files.length,
            total: findings.length,
            byRule: counts,
            budgets: Object.fromEntries(Object.keys(counts).map((r) => [r, budgetFor(r)])),
            regressions: over,
            findings,
            staleAllowListEntries: stale
        }, null, 2)}\n`);
    } else {
        console.log(`Clarity audit — ${files.length} stylesheets scanned, ${findings.length} findings\n`);
        for (const [rule, byFile] of groupByRule(findings)) {
            const count = counts[rule];
            const budget = budgetFor(rule);
            const status = count > budget ? 'OVER BUDGET' : `${count}/${budget}`;
            console.log(`${rule} — ${status}`);
            for (const [file, list] of [...byFile.entries()].sort()) {
                console.log(`  ${file}`);
                for (const f of list.slice(0, 6)) console.log(`    ${f.line}: ${f.text}`);
                if (list.length > 6) console.log(`    … ${list.length - 6} more`);
            }
            console.log('');
        }
        if (stale.length) {
            console.log('Stale allow-list entries (delete these):');
            for (const s of stale) console.log(`  ${s.file} — ${s.text}`);
            console.log('');
        }
        if (over.length) {
            console.log('New drift beyond the recorded baseline:');
            for (const r of over) console.log(`  ${r.rule}: ${r.count} findings, budget ${r.budget}`);
            console.log('');
        }
        const allowed = Object.values(ALLOW_LIST).reduce((n, rules) => n + Object.keys(rules).length, 0);
        console.log(`Acknowledged exceptions: ${allowed}`);
    }

    if (over.length || stale.length) process.exitCode = 1;
}

module.exports = {
    collectStyleFiles,
    parseDeclarations,
    auditFile,
    applyAllowList,
    regressions,
    ALLOW_LIST,
    BASELINE,
    COMPONENT_DIR
};

if (require.main === module) run();
