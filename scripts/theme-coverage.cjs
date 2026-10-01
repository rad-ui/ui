#!/usr/bin/env node
/**
 * Reports per-component theme SCSS coverage and flags components that ship with
 * a recipe for one theme but not the other.
 *
 * This exists because both themes are public exports presented as
 * interchangeable. A component with a Clarity recipe but no Baremetal recipe
 * silently falls back to Clarity's styling while `data-rad-ui-design-system`
 * says baremetal is active — the theme appears to do nothing for that component.
 *
 * Some components are deliberately styleless: they carry no visual design at all
 * (VisuallyHidden applies inline styles, AspectRatio sets an inline ratio, Theme
 * and LiveRegion are providers). Those are allow-listed rather than given an
 * empty recipe, so the report stays about real gaps.
 *
 * Usage:
 *   node scripts/theme-coverage.cjs           # human-readable table
 *   node scripts/theme-coverage.cjs --json    # machine-readable
 */
const fs = require('fs');
const path = require('path');

const COMPONENT_DIR = path.resolve(__dirname, '../src/components/ui');

/**
 * Components intentionally without theme SCSS, with the reason. Keep this list
 * short and justify each entry — a component belongs here only if it has no
 * visual design to theme.
 */
const STYLESS_BY_DESIGN = {
    AspectRatio: 'sets an inline `aspect-ratio`; no themed appearance',
    LiveRegion: 'visually-hidden live region; inline styles only',
    Theme: 'theme provider; ships tokens, not appearance',
    VisuallyHidden: 'visually-hidden utility; inline styles only'
};

/** @typedef {{ name: string, clarity: string[], baremetal: string[], styleless: boolean, reason?: string }} ComponentCoverage */

/** @returns {ComponentCoverage[]} */
function collectCoverage() {
    return fs.readdirSync(COMPONENT_DIR)
        .filter((entry) => {
            const full = path.join(COMPONENT_DIR, entry);
            return fs.statSync(full).isDirectory() && fs.existsSync(path.join(full, `${entry}.tsx`));
        })
        .sort()
        .map((name) => {
            const files = fs.readdirSync(path.join(COMPONENT_DIR, name))
                .filter((file) => file.endsWith('.scss'));
            return {
                name,
                clarity: files.filter((f) => f.includes('.clarity.')).sort(),
                baremetal: files.filter((f) => f.includes('.baremetal.')).sort(),
                styleless: false,
                ...(STYLESS_BY_DESIGN[name] ? { styleless: true, reason: STYLESS_BY_DESIGN[name] } : {})
            };
        });
}

/**
 * Components with a recipe in one theme but not the other. These are the real
 * regressions: the theme loads, declares a scope, and then does nothing.
 */
function themeMismatches(coverage) {
    return coverage.filter((c) => !c.styleless && Boolean(c.clarity.length) !== Boolean(c.baremetal.length));
}

/** Components with no recipe at all and no allow-list entry. */
function unaccounted(coverage) {
    return coverage.filter((c) => !c.styleless && !c.clarity.length && !c.baremetal.length);
}

module.exports = { collectCoverage, themeMismatches, unaccounted, STYLESS_BY_DESIGN, COMPONENT_DIR };

if (require.main === module) {
    const coverage = collectCoverage();
    const mismatches = themeMismatches(coverage);
    const missing = unaccounted(coverage);

    if (process.argv.includes('--json')) {
        process.stdout.write(`${JSON.stringify({
            total: coverage.length,
            mismatches,
            unaccounted: missing,
            stylelessByDesign: coverage.filter((c) => c.styleless)
        }, null, 2)}\n`);
    } else {
        const pad = (s, n) => String(s).padEnd(n);
        console.log(`${pad('COMPONENT', 22)}${pad('CLARITY', 9)}BAREMETAL`);
        console.log('-'.repeat(45));
        for (const c of coverage) {
            const flag = c.styleless ? '  styleless by design' : '';
            console.log(
                `${pad(c.name, 22)}` +
                `${pad(c.clarity.length || '—', 9)}` +
                `${c.baremetal.length || '—'}${flag}`
            );
        }
        console.log('-'.repeat(45));
        console.log(`Total components:          ${coverage.length}`);
        console.log(`Theme mismatches:          ${mismatches.length}`);
        console.log(`Unaccounted (no SCSS):     ${missing.length}`);
        console.log(`Styleless by design:       ${coverage.filter((c) => c.styleless).length}`);
        for (const m of mismatches) {
            console.log(`  ! ${m.name}: has only ${m.clarity.length ? 'clarity' : 'baremetal'}`);
        }
        for (const m of missing) {
            console.log(`  ! ${m.name}: no theme SCSS and not allow-listed as styleless`);
        }
    }

    if (mismatches.length || missing.length) process.exitCode = 1;
}
