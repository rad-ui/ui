// Comparison pages: /compare and /compare/<slug>.
//
// Every row in a coverage table comes from the other library's public docs or
// source, linked in `sources`. Checked on CHECKED_ON. When a library adds a
// component, update its row and the date; never guess. Notes in a cell (like
// "Preview") repeat what that library's docs say. `unverified: true` marks a
// claim we could not confirm from a primary source.

export const CHECKED_ON = '2026-11-18'

export type Cell = boolean | string
export type CoverageRow = { component: string; rad: Cell; other: Cell; unverified?: boolean }

export type Comparison = {
    slug: string
    name: string
    /** One line for the index card and meta description. */
    summary: string
    seoTitle: string
    seoDescription: string
    keywords: string[]
    intro: string[]
    atAGlance: { label: string; rad: string; other: string }[]
    accessibility: string[]
    styling: string[]
    install: { rad: string; other: string; notes: string[] }
    api: { note: string; rad: string; other: string; otherLang?: string }
    pickOther: string[]
    pickRad: string[]
    coverage: CoverageRow[]
    coverageNote?: string
    sources: { label: string; href: string }[]
}

const RAD_DIALOG = `import Button from "@radui/ui/Button"
import Dialog from "@radui/ui/Dialog"

export function EditProfile() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Edit profile</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Close asChild>
            <Button>Done</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}`

const RAD_SOURCES = [
    { label: 'Rad UI components', href: 'https://www.rad-ui.com/docs/first-steps/introduction' },
    { label: 'Rad UI on GitHub', href: 'https://github.com/rad-ui/ui' },
]

const RAD_STYLING =
    'Rad UI ships unstyled behaviour with stable data-* attributes for every state. Styling is opt-in: import @radui/ui/themes/default.css and wrap the app in <Theme classNamespace="rad-ui"> for the Clarity theme, retheme it through --rad-ui-* tokens (see the theme generator), or skip the theme and style the parts with your own CSS or Tailwind.'

const RAD_INSTALL = 'pnpm add @radui/ui'

export const comparisons: Comparison[] = [
    {
        slug: 'radix-ui',
        name: 'Radix UI',
        summary: 'The closest match: same compound-part API, both unstyled. Radix is older and more widely used; Rad UI adds an optional theme and more components.',
        seoTitle: 'Rad UI vs Radix UI: a Radix UI alternative compared',
        seoDescription:
            'Rad UI vs Radix Primitives, compared from their public docs: component coverage, accessibility, styling, install model and API. Plus when Radix is the better pick.',
        keywords: ['radix ui alternative', 'rad ui vs radix', 'radix primitives alternative', 'radix ui vs', 'headless react components'],
        intro: [
            'Radix Primitives is the library most React developers think of for unstyled, accessible components, and the base layer of shadcn/ui. Rad UI follows the same idea, with a very similar API: compound parts (Root, Trigger, Content), asChild for composition, and state exposed as data-* attributes.',
            'If you know Radix, you already know most of Rad UI. The differences are in what ships around the primitives: an optional theme with design tokens, a Tailwind v4 preset, and more components, such as NumberField, Tree, Table, Steps and Splitter.',
        ],
        atAGlance: [
            { label: 'Package', rad: '@radui/ui (one package, per-component entry points)', other: 'radix-ui (one package), or @radix-ui/react-* per primitive' },
            { label: 'Styling', rad: 'Unstyled, with an optional theme and tokens', other: 'Unstyled' },
            { label: 'API shape', rad: 'Compound parts, asChild, data-* state', other: 'Compound parts, asChild, data-* state' },
            { label: 'Frameworks', rad: 'React', other: 'React' },
            { label: 'Maturity', rad: 'Younger, smaller community', other: 'Widely used since 2020, large ecosystem' },
        ],
        accessibility: [
            'Both follow the WAI-ARIA Authoring Practices: roles and states, roving focus in composite widgets, focus trapping in modals, and focus return on close.',
            'Radix documents a keyboard interaction table per component. Rad UI component pages document their keyboard map and the ARIA pattern they follow.',
            'Neither library can make your colour choices accessible. Rad UI’s theme checks text contrast in its own palette, and the theme generator checks yours.',
        ],
        styling: [
            'Radix ships no styles. You target data-state, data-side and similar attributes with any CSS approach.',
            RAD_STYLING,
        ],
        install: {
            rad: RAD_INSTALL,
            other: 'npm install radix-ui',
            notes: [
                'Radix recommends the single tree-shakable radix-ui package and still publishes each primitive as @radix-ui/react-<name>. Its docs advise keeping those versions in step to avoid duplicate shared dependencies.',
                'Rad UI is one package with an entry point per component (@radui/ui/Dialog), so you import only what you use.',
            ],
        },
        api: {
            note: 'The same dialog in both. The structure is nearly identical, which makes moving between them a mostly mechanical change of imports.',
            rad: RAD_DIALOG,
            other: `import { Dialog } from "radix-ui"

export function EditProfile() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>Edit profile</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Close asChild>
            <button>Done</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}`,
        },
        pickOther: [
            'You want the most battle-tested option with the largest community, the most answers online and the most third-party examples.',
            'You use shadcn/ui or another kit built on Radix and want to stay on one primitive layer.',
            'You only need the components Radix already has and want nothing else in the package.',
        ],
        pickRad: [
            'You want the Radix-style API plus components Radix does not ship, like NumberField, Tree, Table, Steps, Splitter, Meter or Combobox.',
            'You want an optional, token-driven theme you can turn on, retheme or drop, instead of styling everything from zero.',
            'You want to influence a younger library directly: issues and PRs on Rad UI get read by the people who write it.',
        ],
        coverage: [
            { component: 'Accordion', rad: true, other: true },
            { component: 'Alert Dialog', rad: true, other: true },
            { component: 'Aspect Ratio', rad: true, other: true },
            { component: 'Avatar', rad: true, other: true },
            { component: 'Checkbox', rad: true, other: true },
            { component: 'Collapsible', rad: true, other: true },
            { component: 'Combobox / Autocomplete', rad: true, other: false },
            { component: 'Command palette', rad: 'Preview', other: false },
            { component: 'Context Menu', rad: true, other: true },
            { component: 'Dialog', rad: true, other: true },
            { component: 'Drawer', rad: true, other: false },
            { component: 'Dropdown Menu', rad: true, other: true },
            { component: 'Form / Field', rad: true, other: 'Form' },
            { component: 'Hover Card', rad: true, other: true },
            { component: 'Menubar', rad: true, other: true },
            { component: 'Meter', rad: true, other: false },
            { component: 'Navigation Menu', rad: true, other: true },
            { component: 'Number Field', rad: true, other: false },
            { component: 'One-time password field', rad: true, other: 'Preview', unverified: true },
            { component: 'Popover', rad: true, other: true },
            { component: 'Progress', rad: true, other: true },
            { component: 'Radio Group', rad: true, other: true },
            { component: 'Scroll Area', rad: true, other: true },
            { component: 'Select', rad: true, other: true },
            { component: 'Separator', rad: true, other: true },
            { component: 'Slider', rad: true, other: true },
            { component: 'Splitter', rad: true, other: false },
            { component: 'Steps', rad: true, other: false },
            { component: 'Switch', rad: true, other: true },
            { component: 'Table', rad: true, other: false },
            { component: 'Tabs', rad: true, other: true },
            { component: 'Toast', rad: true, other: true },
            { component: 'Toggle / Toggle Group', rad: true, other: true },
            { component: 'Toolbar', rad: true, other: true },
            { component: 'Tooltip', rad: true, other: true },
            { component: 'Tree', rad: true, other: false },
            { component: 'Password toggle field', rad: false, other: 'Preview', unverified: true },
            { component: 'Visually Hidden, Slot, Direction', rad: true, other: true },
        ],
        coverageNote:
            'Radix rows come from the package list in the radix-ui/primitives repository and the Radix docs. "Preview" marks One-Time Password Field and Password Toggle Field, which shipped as preview primitives; we could not confirm their current label from the docs pages, so check before relying on them.',
        sources: [
            { label: 'Radix Primitives docs', href: 'https://www.radix-ui.com/primitives/docs/overview/introduction' },
            { label: 'radix-ui/primitives packages', href: 'https://github.com/radix-ui/primitives/tree/main/packages/react' },
            ...RAD_SOURCES,
        ],
    },
    {
        slug: 'headless-ui',
        name: 'Headless UI',
        summary: 'Tailwind Labs’ small, polished set of unstyled components. Rad UI covers far more ground; Headless UI is tighter and made for Tailwind.',
        seoTitle: 'Rad UI vs Headless UI: a Headless UI alternative compared',
        seoDescription:
            'Rad UI vs Headless UI (Tailwind Labs), compared from their public docs: component coverage, accessibility, styling with Tailwind, install and API. Plus when Headless UI is the better pick.',
        keywords: ['headless ui alternative', 'rad ui vs headless ui', 'headlessui alternative', 'tailwind headless components'],
        intro: [
            'Headless UI is made by Tailwind Labs, the team behind Tailwind CSS. It is a small, carefully designed set of unstyled components, built to be styled with Tailwind utility classes.',
            'Rad UI is unstyled too and works well with Tailwind (it ships a Tailwind v4 preset), but it covers many more components: menus beyond dropdowns, toasts, tooltips, sliders, trees, tables and more.',
        ],
        atAGlance: [
            { label: 'Package', rad: '@radui/ui', other: '@headlessui/react (v2.1 at time of writing)' },
            { label: 'Styling', rad: 'Unstyled, with an optional theme and tokens', other: 'Unstyled, made for Tailwind' },
            { label: 'API shape', rad: 'Compound parts, asChild, data-* state', other: 'Named components (Menu, MenuButton, MenuItems), render props and data-* state' },
            { label: 'Frameworks', rad: 'React', other: 'React and Vue (separate packages)' },
            { label: 'Component count', rad: '60+', other: 'About 15 (see the table)' },
        ],
        accessibility: [
            'Both implement WAI-ARIA patterns with keyboard support and focus management, so you do not wire roles and key handlers yourself.',
            'Headless UI covers fewer widgets, so you will build more of the remaining ones (tooltips, toasts, sliders) yourself or bring another library for them.',
        ],
        styling: [
            'Headless UI exposes state as data attributes (data-focus, data-open, data-active) and render props, and its docs style everything with Tailwind modifiers like data-focus:bg-blue-100.',
            RAD_STYLING,
        ],
        install: {
            rad: RAD_INSTALL,
            other: 'npm install @headlessui/react',
            notes: ['Both are single packages. Headless UI has a separate @headlessui/vue package for Vue.'],
        },
        api: {
            note: 'A dialog in each. Headless UI keeps the open state in your component; Rad UI can manage it for you or take it controlled.',
            rad: RAD_DIALOG,
            other: `import { useState } from "react"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"

export function EditProfile() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Edit profile</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogPanel>
          <DialogTitle>Edit profile</DialogTitle>
          <button onClick={() => setIsOpen(false)}>Done</button>
        </DialogPanel>
      </Dialog>
    </>
  )
}`,
        },
        pickOther: [
            'You live in Tailwind, need only the components it has, and want the smallest possible API from the Tailwind team.',
            'You also build in Vue and want the same component model in both.',
            'You use Tailwind Plus (formerly Tailwind UI) templates, which are built on Headless UI.',
        ],
        pickRad: [
            'You need components Headless UI does not have: tooltips, toasts, sliders, accordions, context menus, menubars, trees, tables and more.',
            'You want an optional theme and design tokens alongside unstyled parts.',
            'You prefer one consistent compound-part API across every component.',
        ],
        coverage: [
            { component: 'Accordion', rad: true, other: 'Disclosure' },
            { component: 'Alert Dialog', rad: true, other: false },
            { component: 'Avatar', rad: true, other: false },
            { component: 'Button', rad: true, other: true },
            { component: 'Checkbox', rad: true, other: true },
            { component: 'Collapsible / Disclosure', rad: true, other: true },
            { component: 'Combobox', rad: true, other: true },
            { component: 'Context Menu', rad: true, other: false },
            { component: 'Dialog', rad: true, other: true },
            { component: 'Drawer', rad: true, other: false },
            { component: 'Dropdown Menu', rad: true, other: true },
            { component: 'Field / Fieldset', rad: true, other: true },
            { component: 'Hover Card', rad: true, other: false },
            { component: 'Input / Textarea', rad: true, other: true },
            { component: 'Menubar', rad: true, other: false },
            { component: 'Navigation Menu', rad: true, other: false },
            { component: 'Number Field', rad: true, other: false },
            { component: 'Popover', rad: true, other: true },
            { component: 'Progress / Meter', rad: true, other: false },
            { component: 'Radio Group', rad: true, other: true },
            { component: 'Scroll Area', rad: true, other: false },
            { component: 'Select (custom listbox)', rad: true, other: 'Listbox' },
            { component: 'Slider', rad: true, other: false },
            { component: 'Switch', rad: true, other: true },
            { component: 'Table', rad: true, other: false },
            { component: 'Tabs', rad: true, other: true },
            { component: 'Toast', rad: true, other: false },
            { component: 'Toggle Group', rad: true, other: false },
            { component: 'Tooltip', rad: true, other: false },
            { component: 'Transition helper', rad: false, other: true },
            { component: 'Tree', rad: true, other: false },
        ],
        coverageNote: 'Headless UI rows come from the component list in the Headless UI React docs sidebar (Components and Forms).',
        sources: [
            { label: 'Headless UI React docs', href: 'https://headlessui.com/react/menu' },
            { label: 'tailwindlabs/headlessui on GitHub', href: 'https://github.com/tailwindlabs/headlessui' },
            ...RAD_SOURCES,
        ],
    },
    {
        slug: 'react-aria',
        name: 'React Aria',
        summary: 'Adobe’s deeply engineered accessibility layer, with hooks and components. Strongest on i18n, dates and touch; a different API style from Rad UI.',
        seoTitle: 'Rad UI vs React Aria: a React Aria alternative compared',
        seoDescription:
            'Rad UI vs React Aria Components (Adobe), compared from their public docs: component coverage, accessibility, styling, install and API. Plus when React Aria is the better pick.',
        keywords: ['react aria alternative', 'rad ui vs react aria', 'react aria components alternative', 'accessible react components'],
        intro: [
            'React Aria, from Adobe, is two layers: low-level hooks (react-aria) and unstyled components (react-aria-components). It powers Adobe’s React Spectrum and is known for unusually thorough accessibility, internationalisation and touch handling.',
            'Rad UI aims for the same outcome, accessible components you style yourself, with a smaller API in the Radix style. React Aria goes further in some areas, especially dates, calendars, colour pickers, drag and drop, and locale-aware formatting.',
        ],
        atAGlance: [
            { label: 'Package', rad: '@radui/ui', other: 'react-aria-components (and react-aria hooks)' },
            { label: 'Styling', rad: 'Unstyled, with an optional theme and tokens', other: 'Unstyled; default class names, data-* states and render props' },
            { label: 'API shape', rad: 'Compound parts, asChild, data-* state', other: 'Composed components with slots, render props, onPress-style events' },
            { label: 'Frameworks', rad: 'React', other: 'React' },
            { label: 'Maintainer', rad: 'Open-source community', other: 'Adobe' },
        ],
        accessibility: [
            'React Aria is tested across many screen readers and devices, normalises pointer, touch and keyboard input into press events, and ships localisation for many languages, including date and number formats.',
            'Rad UI follows the WAI-ARIA patterns with keyboard support, focus management and right-to-left support through DirectionProvider. It does not ship React Aria’s depth of locale data or its date and colour widgets.',
        ],
        styling: [
            'React Aria Components render default class names (like .react-aria-Button) and data attributes (data-pressed, data-selected), and accept render props for state-based classes. Adobe publishes starter kits, including a Tailwind one.',
            RAD_STYLING,
        ],
        install: {
            rad: RAD_INSTALL,
            other: 'npm install react-aria-components',
            notes: ['React Aria also publishes the lower-level react-aria hooks for building fully custom components.'],
        },
        api: {
            note: 'A dialog in each. React Aria wires the trigger and dialog through DialogTrigger and uses a render function for close; Rad UI uses named parts.',
            rad: RAD_DIALOG,
            other: `import { Button, Dialog, DialogTrigger, Heading, Modal } from "react-aria-components"

export function EditProfile() {
  return (
    <DialogTrigger>
      <Button>Edit profile</Button>
      <Modal>
        <Dialog>
          {({ close }) => (
            <>
              <Heading slot="title">Edit profile</Heading>
              <Button onPress={close}>Done</Button>
            </>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  )
}`,
        },
        pickOther: [
            'You need date pickers, calendars, colour pickers, drag and drop, or tag groups with full accessibility.',
            'You ship in many languages and want built-in locale-aware formatting and translations for component strings.',
            'You want hooks to build fully custom widgets with the same accessibility engine.',
        ],
        pickRad: [
            'You prefer the Radix-style compound API (Root, Trigger, Content with asChild) over slots and render props.',
            'You need components React Aria does not list, such as Avatar, Hover Card, Menubar, Navigation Menu, Scroll Area, Splitter or Steps.',
            'You want an optional theme and token system you can switch on.',
        ],
        coverage: [
            { component: 'Accordion / Disclosure', rad: true, other: true },
            { component: 'Alert Dialog', rad: true, other: 'Dialog with role="alertdialog"' },
            { component: 'Avatar', rad: true, other: false },
            { component: 'Breadcrumbs', rad: true, other: true },
            { component: 'Calendar / Date Picker', rad: false, other: true },
            { component: 'Checkbox', rad: true, other: true },
            { component: 'Color picker', rad: false, other: true },
            { component: 'Combobox / Autocomplete', rad: true, other: true },
            { component: 'Context Menu', rad: true, other: false, unverified: true },
            { component: 'Dialog / Modal', rad: true, other: true },
            { component: 'Drag and drop, drop zone', rad: false, other: true },
            { component: 'Dropdown Menu', rad: true, other: 'Menu' },
            { component: 'File trigger', rad: false, other: true },
            { component: 'Form / Field', rad: true, other: true },
            { component: 'Hover Card', rad: true, other: false },
            { component: 'Link', rad: true, other: true },
            { component: 'Menubar', rad: true, other: false },
            { component: 'Meter', rad: true, other: true },
            { component: 'Navigation Menu', rad: true, other: false },
            { component: 'Number Field', rad: true, other: true },
            { component: 'Popover', rad: true, other: true },
            { component: 'Progress', rad: true, other: 'ProgressBar' },
            { component: 'Radio Group', rad: true, other: true },
            { component: 'Scroll Area', rad: true, other: false },
            { component: 'Search Field', rad: false, other: true },
            { component: 'Select', rad: true, other: true },
            { component: 'Separator', rad: true, other: true },
            { component: 'Slider', rad: true, other: true },
            { component: 'Splitter', rad: true, other: false },
            { component: 'Steps', rad: true, other: false },
            { component: 'Switch', rad: true, other: true },
            { component: 'Table', rad: true, other: true },
            { component: 'Tabs', rad: true, other: true },
            { component: 'Tag Group', rad: false, other: true },
            { component: 'Text Field / Text Area', rad: true, other: true },
            { component: 'Toast', rad: true, other: 'Unstable (UNSTABLE_Toast)' },
            { component: 'Toggle / Toggle Group', rad: true, other: 'ToggleButton, ToggleButtonGroup' },
            { component: 'Toolbar', rad: true, other: true },
            { component: 'Tooltip', rad: true, other: true },
            { component: 'Tree', rad: true, other: true },
        ],
        coverageNote:
            'React Aria rows come from the component files in the react-aria-components package source and its docs. Toast is exported with an UNSTABLE_ prefix in its docs. Rows marked "unverified" could not be confirmed from the public docs.',
        sources: [
            { label: 'React Aria docs', href: 'https://react-aria.adobe.com/' },
            { label: 'react-aria-components source', href: 'https://github.com/adobe/react-spectrum/tree/main/packages/react-aria-components/src' },
            ...RAD_SOURCES,
        ],
    },
    {
        slug: 'ark-ui',
        name: 'Ark UI',
        summary: 'Chakra’s state-machine powered headless library for React, Solid, Vue and Svelte. Very broad coverage; pick it for multi-framework teams.',
        seoTitle: 'Rad UI vs Ark UI: an Ark UI alternative compared',
        seoDescription:
            'Rad UI vs Ark UI, compared from their public docs: component coverage, accessibility, styling, install and API. Plus when Ark UI is the better pick.',
        keywords: ['ark ui alternative', 'rad ui vs ark ui', 'headless react components', 'zag js alternative'],
        intro: [
            'Ark UI comes from the Chakra UI team. It is headless and built on Zag.js state machines, which lets the same component logic run in React, Solid, Vue and Svelte.',
            'Rad UI is React-only and uses a Radix-style API. Ark UI’s list is broad, with widgets like date pickers, colour pickers, file upload, signature pad and QR code that Rad UI does not have.',
        ],
        atAGlance: [
            { label: 'Package', rad: '@radui/ui', other: '@ark-ui/react (plus Solid, Vue and Svelte packages)' },
            { label: 'Styling', rad: 'Unstyled, with an optional theme and tokens', other: 'Unstyled; data-scope / data-part / data-state attributes; pairs with Panda CSS (Park UI)' },
            { label: 'API shape', rad: 'Compound parts, asChild, data-* state', other: 'Compound parts (Root, Trigger, Content, Positioner), asChild' },
            { label: 'Frameworks', rad: 'React', other: 'React, Solid, Vue, Svelte' },
            { label: 'Engine', rad: 'React state and hooks', other: 'Zag.js finite state machines' },
        ],
        accessibility: [
            'Both implement WAI-ARIA patterns with keyboard and focus handling. Ark’s state machines make behaviour the same across frameworks and easy to test.',
            'Some Ark components are labelled Preview in its docs (for example Drawer, Splitter, Image Cropper); check a component’s status before relying on it.',
        ],
        styling: [
            'Ark components are unstyled and mark every part with data-scope and data-part attributes, plus state attributes. The Chakra team’s Park UI offers styled versions on Panda CSS or Tailwind.',
            RAD_STYLING,
        ],
        install: {
            rad: RAD_INSTALL,
            other: 'npm install @ark-ui/react',
            notes: ['Ark publishes one package per framework. Components can be imported from subpaths, like @ark-ui/react/dialog.'],
        },
        api: {
            note: 'A dialog in each. The shapes are close; Ark adds a Positioner part and uses CloseTrigger.',
            rad: RAD_DIALOG,
            other: `import { Dialog } from "@ark-ui/react/dialog"
import { Portal } from "@ark-ui/react/portal"

export function EditProfile() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Edit profile</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.CloseTrigger>Done</Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}`,
        },
        pickOther: [
            'Your team ships in more than one framework and wants one component model across them.',
            'You need date pickers, colour pickers, file upload, tags input, rating, signature pad, carousel or a guided tour.',
            'You already use Chakra UI or Panda CSS.',
        ],
        pickRad: [
            'You are React-only and prefer a Radix-style API without a state-machine layer.',
            'You need Alert Dialog, Context Menu as its own component, Menubar, Toolbar, Table or Meter.',
            'You want an optional theme and design tokens you can switch on.',
        ],
        coverage: [
            { component: 'Accordion', rad: true, other: true },
            { component: 'Alert Dialog', rad: true, other: 'Dialog with role="alertdialog"' },
            { component: 'Avatar', rad: true, other: true },
            { component: 'Carousel', rad: false, other: true },
            { component: 'Checkbox', rad: true, other: true },
            { component: 'Collapsible', rad: true, other: true },
            { component: 'Color Picker', rad: false, other: true },
            { component: 'Combobox', rad: true, other: true },
            { component: 'Context Menu', rad: true, other: 'Menu with a context trigger', unverified: true },
            { component: 'Date Picker', rad: false, other: true },
            { component: 'Dialog', rad: true, other: true },
            { component: 'Drawer', rad: true, other: 'Preview' },
            { component: 'Dropdown Menu', rad: true, other: 'Menu' },
            { component: 'Field / Fieldset', rad: true, other: true },
            { component: 'File Upload', rad: false, other: true },
            { component: 'Hover Card', rad: true, other: true },
            { component: 'Menubar', rad: true, other: false },
            { component: 'Meter', rad: true, other: false },
            { component: 'Navigation Menu', rad: true, other: true },
            { component: 'Number Field', rad: true, other: 'Number Input' },
            { component: 'One-time password field', rad: true, other: 'Pin Input' },
            { component: 'Pagination', rad: false, other: true },
            { component: 'Popover', rad: true, other: true },
            { component: 'Progress', rad: true, other: 'Linear and circular' },
            { component: 'Radio Group', rad: true, other: true },
            { component: 'Rating', rad: false, other: true },
            { component: 'Scroll Area', rad: true, other: true },
            { component: 'Select', rad: true, other: true },
            { component: 'Slider', rad: true, other: true },
            { component: 'Splitter', rad: true, other: 'Preview' },
            { component: 'Steps', rad: true, other: true },
            { component: 'Switch', rad: true, other: true },
            { component: 'Table', rad: true, other: false },
            { component: 'Tabs', rad: true, other: true },
            { component: 'Tags Input', rad: false, other: true },
            { component: 'Toast', rad: true, other: true },
            { component: 'Toggle / Toggle Group', rad: true, other: true },
            { component: 'Toolbar', rad: true, other: false },
            { component: 'Tooltip', rad: true, other: true },
            { component: 'Tree', rad: true, other: 'Tree View' },
        ],
        coverageNote:
            'Ark rows come from the Ark UI docs sidebar (Components and Utilities). Ark also lists Angle Slider, Clipboard, Editable, Floating Panel, Image Cropper, Marquee, Password Input, QR Code, Segment Group, Signature Pad, Timer, Table of Contents and Tour, none of which Rad UI has.',
        sources: [
            { label: 'Ark UI docs', href: 'https://ark-ui.com/docs/components/accordion' },
            { label: 'chakra-ui/ark on GitHub', href: 'https://github.com/chakra-ui/ark' },
            ...RAD_SOURCES,
        ],
    },
    {
        slug: 'shadcn-ui',
        name: 'shadcn/ui',
        summary: 'Not a dependency but styled source code you copy in, built on Radix primitives by default. You can use Rad UI the same way, as the layer under your own components.',
        seoTitle: 'Rad UI vs shadcn/ui: a shadcn/ui alternative compared',
        seoDescription:
            'Rad UI vs shadcn/ui, compared fairly: shadcn/ui copies styled Radix-based components into your project; Rad UI is a headless package with an optional theme. Coverage, accessibility, styling and when to pick each.',
        keywords: ['shadcn alternative', 'shadcn ui alternative', 'rad ui vs shadcn', 'shadcn alternatives react', 'shadcn vs headless'],
        intro: [
            'shadcn/ui describes itself as “not a component library” but “how you build your component library”. A CLI copies styled component source into your project, and you own and edit that code. Most of its interactive components are built on Radix primitives by default, styled with Tailwind.',
            'So the fair comparison is two layers: shadcn/ui is the styled layer you copy, Rad UI is the behaviour layer you install (with an optional theme). You can build the shadcn/ui way on Rad UI: write your own styled wrappers over Rad UI parts and keep them in your repo.',
        ],
        atAGlance: [
            { label: 'What you get', rad: 'An npm dependency with unstyled parts and an optional theme', other: 'Source files in your repo, styled with Tailwind' },
            { label: 'Updates', rad: 'Upgrade the package', other: 'Re-run the CLI or merge upstream changes by hand' },
            { label: 'Styling', rad: 'Unstyled, theme, or tokens', other: 'Tailwind classes in the copied files, CSS variable themes' },
            { label: 'Behaviour layer', rad: 'Rad UI itself', other: 'Radix primitives by default, plus a few other packages' },
            { label: 'Frameworks', rad: 'React', other: 'React' },
        ],
        accessibility: [
            'shadcn/ui inherits keyboard and ARIA behaviour from the primitives under it, so its interactive components are as accessible as Radix makes them, as long as edits to the copied code keep that wiring intact.',
            'Rad UI keeps behaviour inside the package, so your styling changes cannot break it, and fixes arrive with an upgrade instead of a manual merge.',
        ],
        styling: [
            'shadcn/ui components are Tailwind classes in your own files, themed through CSS variables like --primary and --background. Community tools such as tweakcn generate those variables.',
            RAD_STYLING,
        ],
        install: {
            rad: RAD_INSTALL,
            other: 'npx shadcn@latest add dialog',
            notes: [
                'shadcn/ui’s CLI writes components into your project (by default under components/ui) and installs the primitives they depend on.',
                'Rad UI installs like any package; there is nothing to copy unless you choose to write wrappers.',
            ],
        },
        api: {
            note: 'The same dialog. shadcn/ui wraps Radix parts in styled, flat-named exports that live in your repo.',
            rad: RAD_DIALOG,
            other: `// After: npx shadcn@latest add dialog button
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function EditProfile() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <Button>Done</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}`,
        },
        pickOther: [
            'You want a good-looking Tailwind UI today and are happy to own and maintain the component code.',
            'You want the huge ecosystem around it: blocks, charts, a sidebar, registries and many community themes.',
            'Your team edits component internals often and prefers source in the repo to a dependency.',
        ],
        pickRad: [
            'You want accessible behaviour as a dependency you upgrade, not code you merge by hand.',
            'You want to design your own look from unstyled parts, or start from a theme and retheme it with tokens.',
            'You need components shadcn/ui does not include, such as Number Field, Tree, Toolbar, Steps or Meter.',
        ],
        coverage: [
            { component: 'Accordion', rad: true, other: true },
            { component: 'Alert Dialog', rad: true, other: true },
            { component: 'Avatar', rad: true, other: true },
            { component: 'Badge', rad: true, other: true },
            { component: 'Breadcrumb', rad: true, other: true },
            { component: 'Calendar / Date Picker', rad: false, other: true },
            { component: 'Card', rad: true, other: true },
            { component: 'Carousel', rad: false, other: true },
            { component: 'Chart', rad: false, other: true },
            { component: 'Checkbox', rad: true, other: true },
            { component: 'Collapsible', rad: true, other: true },
            { component: 'Combobox', rad: true, other: true },
            { component: 'Command palette', rad: 'Preview', other: true },
            { component: 'Context Menu', rad: true, other: true },
            { component: 'Dialog', rad: true, other: true },
            { component: 'Drawer / Sheet', rad: true, other: true },
            { component: 'Dropdown Menu', rad: true, other: true },
            { component: 'Field / Form', rad: true, other: true },
            { component: 'Hover Card', rad: true, other: true },
            { component: 'Kbd', rad: true, other: true },
            { component: 'Menubar', rad: true, other: true },
            { component: 'Meter', rad: true, other: false },
            { component: 'Navigation Menu', rad: true, other: true },
            { component: 'Number Field', rad: true, other: false },
            { component: 'One-time password field', rad: true, other: 'Input OTP' },
            { component: 'Pagination', rad: false, other: true },
            { component: 'Popover', rad: true, other: true },
            { component: 'Progress', rad: true, other: true },
            { component: 'Radio Group', rad: true, other: true },
            { component: 'Scroll Area', rad: true, other: true },
            { component: 'Select', rad: true, other: true },
            { component: 'Sidebar', rad: false, other: true },
            { component: 'Skeleton / Spinner', rad: true, other: true },
            { component: 'Slider', rad: true, other: true },
            { component: 'Splitter', rad: true, other: 'Resizable' },
            { component: 'Steps', rad: true, other: false },
            { component: 'Switch', rad: true, other: true },
            { component: 'Table', rad: true, other: 'Table, Data Table' },
            { component: 'Tabs', rad: true, other: true },
            { component: 'Toast', rad: true, other: true },
            { component: 'Toggle / Toggle Group', rad: true, other: true },
            { component: 'Toolbar', rad: true, other: false },
            { component: 'Tooltip', rad: true, other: true },
            { component: 'Tree', rad: true, other: false },
        ],
        coverageNote:
            'shadcn/ui rows come from its components page. It lists more items, including layout and AI-chat pieces; this table keeps the rows both sides could reasonably have.',
        sources: [
            { label: 'shadcn/ui introduction', href: 'https://ui.shadcn.com/docs' },
            { label: 'shadcn/ui components', href: 'https://ui.shadcn.com/docs/components' },
            ...RAD_SOURCES,
        ],
    },
]

export const getComparison = (slug: string) => comparisons.find((item) => item.slug === slug)
