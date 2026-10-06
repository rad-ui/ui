/**
 * Generates the Tailwind CSS v4 theme preset from the JS token source.
 *
 * Tailwind v3 took a JS preset object under `theme.extend`. v4 has no preset
 * format: the equivalent surface is a CSS file of `@theme` variables. This
 * script is the bridge, so `styles/jsTokens/*.js` stays the single source of
 * truth and the emitted CSS stays in sync with every token change.
 *
 * Two mappings matter:
 *
 * 1. Namespace. Each JS token group maps to the v4 theme namespace that owns
 *    the matching utility (`radius` -> `--radius-*` drives `rounded-*`, and so
 *    on). Groups with no v4 namespace (`elevation`, `focus`, `grid`,
 *    `transition`) never produced utilities in v3 either and are deliberately
 *    not emitted: their values are already `var(--rad-ui-*)` references that
 *    `styles/cssTokens/base.tokens.css` defines and ships alongside the theme.
 *    Re-declaring them here would only create self-referential properties.
 *
 * 2. Alpha. v3 substituted `<alpha-value>` into a colour to build opacity
 *    modifiers. v4 dropped the placeholder entirely and composes opacity with
 *    `color-mix()`, so the slot is stripped here and every ramp step becomes a
 *    plain relative oklch() colour.
 *
 * 3. `inline`. The `@theme inline` keyword is load-bearing, not cosmetic; see
 *    the block comment on `INLINE_THEME` below before changing it.
 *
 * Pass `--out <dir>` to additionally copy the result into a publish directory.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tokens from '../styles/jsTokens/index';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const OUTPUT = path.resolve(__dirname, '../styles/tailwind-presets/default.css');

type TokenGroup = Record<string, unknown>;

/**
 * Only the colour ramp is exposed, and that is deliberate.
 *
 * The v3 preset this replaces set `theme.extend.colors` and nothing else, so
 * `shadow-*`, `blur-*`, `rounded-*` and friends all resolved to Tailwind's
 * stock scales. The remaining token groups are real, but they feed the
 * library's own SCSS through `--rad-ui-*` and have no business redefining
 * Tailwind's scale keys: `--shadow-sm` here means "the Rad UI elevation
 * shadow", not "Tailwind's old `shadow-sm`", and binding it would silently
 * restyle every `shadow-sm` on the docs site.
 *
 * Adding a group below is therefore a visual change to consumers, not a
 * mechanical mapping. Keep this list at colours until that is intended.
 */
const THEME_NAMESPACES: Array<[keyof typeof tokens, string]> = [['colors', 'color']];

/**
 * Why the theme block is emitted as `@theme inline` rather than plain `@theme`.
 *
 * Every colour is a relative oklch() that references a `--rad-ui-*` property, and
 * those `--rad-ui-*` properties are re-declared on the theme container — an inner
 * element carrying `data-rad-ui-theme="dark"`, not on `<html>`:
 *
 *   :root                          { --rad-ui-color-gray-50: hsl(0 0% 99%); }
 *   [data-rad-ui-theme="dark"]     { --rad-ui-color-gray-50: hsl(0 0% 8.5%); }
 *
 * A custom property is substituted at the element that *declares* it, not where it
 * is used. Plain `@theme` hoists the vars to `:root`, so `--color-gray-50` would
 * resolve `--rad-ui-color-gray-50` once, on `<html>` — against the light value —
 * and descendants would inherit that already-substituted result. The dark
 * override could never take effect: `bg-gray-50` would stay light on every
 * themed surface.
 *
 * `inline` makes Tailwind substitute the value into each utility instead:
 *
 *   .bg-gray-50 { background-color: oklch(from var(--rad-ui-color-gray-50) l c h); }
 *
 * Now the `var()` sits on the element itself and resolves per element, which is
 * exactly what v3 emitted — v3 put the same `var()` chain straight into the
 * utility, so its dark mode worked for the same reason.
 *
 * The tradeoff: `inline` vars are not written out as CSS custom properties, so
 * `var(--color-gray-50)` is undefined in hand-written CSS. Nothing in this repo
 * needs it, and a `:root` alias would be a footgun anyway — it could only ever
 * hold the light value, silently ignoring the theme. Reference the
 * `--rad-ui-*` properties directly instead.
 */
const INLINE_THEME = '@theme inline';

const ALPHA_PLACEHOLDER = /\s*\/\s*<alpha-value>/g;

/**
 * v3 built `/<opacity>` modifiers by substituting a placeholder into the colour
 * string. v4 composes with `color-mix()` instead and never substitutes, so a
 * leftover placeholder would ship as invalid CSS. Strip it and let the relative
 * colour resolve without an explicit alpha channel.
 */
function normaliseColour(value: string): string {
    return value.replace(ALPHA_PLACEHOLDER, '');
}

function isPlainRecord(value: unknown): value is TokenGroup {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

interface EmittedVariable {
    name: string;
    value: string;
}

function collectThemeVariables(): EmittedVariable[] {
    const collected: EmittedVariable[] = [];

    const push = (namespace: string, name: string, value: string) => {
        collected.push({
            name: `--${namespace}-${name}`,
            value: namespace === 'color' ? normaliseColour(value) : value
        });
    };

    for (const [groupKey, namespace] of THEME_NAMESPACES) {
        const group = tokens[groupKey] as TokenGroup;
        if (!isPlainRecord(group)) continue;

        for (const [key, value] of Object.entries(group)) {
            // Colour ramps nest one level (`gray: { 50: ... }`) while scalars
            // sit beside them (`black: ...`). Both flatten to the same shape:
            // `--color-gray-50` and `--color-black`.
            if (typeof value === 'string') {
                push(namespace, key, value);
                continue;
            }
            if (isPlainRecord(value)) {
                for (const [step, stepValue] of Object.entries(value)) {
                    if (typeof stepValue === 'string') {
                        push(namespace, `${key}-${step}`, stepValue);
                    }
                }
            }
        }
    }

    return collected;
}

function renderBlock(variables: EmittedVariable[], indent = '  '): string {
    return variables.map(({ name, value }) => `${indent}${name}: ${value};`).join('\n');
}

function build(): string {
    const themeVariables = collectThemeVariables();

    return `/* This file is generated. Edit styles/jsTokens/*.js and run
 * \`npm run generate-tailwind-preset\` to regenerate it. */

/* Rad UI theme for Tailwind CSS v4.

 * Import after Tailwind itself:
 *
 *   @import "tailwindcss";
 *   @import "@radui/ui/themes/tailwind-presets/default.css";

 * Every value resolves through a \`--rad-ui-*\` custom property defined by the
 * Rad UI theme CSS, so swapping themes (including dark mode) re-resolves the
 * generated utilities without a rebuild. Opacity modifiers (\`bg-gray-50/90\`)
 * are composed by Tailwind with color-mix() and need no placeholder here.
 *
 * \`inline\` is required: it inlines each value into the utilities that use it so
 * the \`--rad-ui-*\` reference resolves on the element, which is what makes nested
 * and dark themes work. Consumers wanting these as CSS variables should read the
 * \`--rad-ui-*\` properties directly; they are not emitted from this file. */

${INLINE_THEME} {
${renderBlock(themeVariables)}
}
`;
}

const output = build();

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, output, 'utf8');

process.stdout.write(
    `Wrote ${path.relative(process.cwd(), OUTPUT)} (${collectThemeVariables().length} theme variables)\n`
);

/**
 * The v3 preset was a JS config object that rollup had to bundle. The v4 preset
 * is plain CSS, so publishing is a copy. The generated file stays committed so
 * the docs app and Storybook can import the live preset without a build step.
 */
const outIndex = process.argv.indexOf('--out');
if (outIndex !== -1) {
    const destinationDir = path.resolve(process.cwd(), process.argv[outIndex + 1]);
    const destination = path.join(destinationDir, path.basename(OUTPUT));

    fs.mkdirSync(destinationDir, { recursive: true });
    fs.copyFileSync(OUTPUT, destination);

    process.stdout.write(`Copied ${path.relative(process.cwd(), destination)}\n`);
}
