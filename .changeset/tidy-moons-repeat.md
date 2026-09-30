---
"@radui/ui": minor
---

Support React 19 in `asChild` components and enable Tailwind alpha modifiers on design tokens.

**React 19 `asChild` refs** — components that read a ref off the child element (`Primitive`, `PopoverPrimitiveArrow`, `TooltipTrigger`, `AccordionHeader`) accessed `element.ref` directly. React 19 promoted `ref` to a regular prop and left `element.ref` as a deprecation getter, so every `asChild` render logged "Accessing element.ref was removed in React 19" and consumers on React 19 saw warnings from components they never opted into. These now read the ref through a shared `getElementRef` helper that branches on the React major version, because both access paths warn: React 18 warns on `props.ref`, React 19 warns on `element.ref`. Behaviour is unchanged on both versions.

**React 19 peer range** — the `react` and `react-dom` peer dependencies widened from `^18.2.0` to `^18.2.0 || ^19.0.0`. Without this, an application on React 19 could fail installation while this release claims to support it.

**React 19 ref teardown** — React 19 lets a callback ref return a teardown function, which React then calls *instead of* passing `null`. `composeRefs` fanned the node out to every ref but discarded those return values, so a composed ref silently swallowed every teardown an inner ref had registered. It now retains them per ref and replays them on detach, falling back to the old `null` contract for refs that register no teardown. React 18 has no way to run a teardown, so its behaviour is untouched.

**Tailwind alpha modifiers** — the generated Tailwind preset emitted `var(--rad-ui-color-*)` for every ramp step, so Tailwind's `<alpha-value>` placeholder could never be substituted and opacity modifiers such as `bg-gray-50/90` silently produced no color. The preset now emits `oklch(from var(--rad-ui-color-*) l c h / <alpha-value>)`, which enables the full `/<opacity>` syntax across every palette and step. This changes the CSS your build emits for preset-derived color utilities, and it relies on relative color syntax (Chrome 119+, Safari 16.4+, Firefox 128+). That is inside this project's stated support policy of the latest two stable versions of each evergreen browser, but it does raise the effective floor for apps pinning older browsers, so it is released as a `minor` rather than a `patch`.

**Token adjustment** — `--rad-ui-text-muted` in the Clarity design system now resolves to `--rad-ui-color-gray-950` instead of `--rad-ui-color-gray-800`, bringing muted text closer to the secondary text ramp for legibility.
