// Every documented component, grouped by what it is for. The sidebar, the
// /docs/components index, breadcrumbs and the search palette all read this,
// so a component is placed once and shows the same way everywhere.
//
// `docsNavigationSections` stays the flat, alphabetical list (llms.txt, the
// sitemap and previous/next links use it); this file only adds the grouping
// and a one-line purpose per component.

export type ComponentGroupId =
    | 'layout'
    | 'forms'
    | 'buttons'
    | 'overlays'
    | 'navigation'
    | 'feedback'
    | 'data'
    | 'utilities'

export type ComponentGroup = {
    id: ComponentGroupId
    title: string
    /** One line under the group heading on the index page. */
    blurb: string
}

export const componentGroups: readonly ComponentGroup[] = [
    { id: 'layout', title: 'Layout and typography', blurb: 'Containers, dividers and text, with the HTML semantics already right.' },
    { id: 'forms', title: 'Forms', blurb: 'Inputs that submit with the form, validate with the browser and reset with it.' },
    { id: 'buttons', title: 'Buttons and toggles', blurb: 'Pressable things, alone or in groups with one tab stop.' },
    { id: 'overlays', title: 'Overlays and menus', blurb: 'Dialogs, popups and menus with focus, dismissal and positioning handled.' },
    { id: 'navigation', title: 'Navigation and disclosure', blurb: 'Moving between views and revealing more without leaving the page.' },
    { id: 'feedback', title: 'Feedback and status', blurb: 'Telling the user what is happening, visibly and to assistive tech.' },
    { id: 'data', title: 'Data display', blurb: 'People, records and structured values.' },
    { id: 'utilities', title: 'Utilities', blurb: 'Providers and building blocks for your own components.' }
]

export type ComponentMeta = {
    /** URL slug under /docs/components/. */
    slug: string
    /** Display name, as exported from `@radui/ui`. */
    name: string
    group: ComponentGroupId
    /** One sentence: what it is for. */
    purpose: string
}

export const components: readonly ComponentMeta[] = [
    // Layout and typography
    { slug: 'aspect-ratio', name: 'AspectRatio', group: 'layout', purpose: 'Keeps media at a fixed ratio while it scales.' },
    { slug: 'card', name: 'Card', group: 'layout', purpose: 'Groups related content and actions in one surface.' },
    { slug: 'separator', name: 'Separator', group: 'layout', purpose: 'A horizontal or vertical divider between sections.' },
    { slug: 'scroll-area', name: 'ScrollArea', group: 'layout', purpose: 'A scrollable container with custom scrollbars.' },
    { slug: 'splitter', name: 'Splitter', group: 'layout', purpose: 'Resizable panels you drag or resize with the keyboard.' },
    { slug: 'heading', name: 'Heading', group: 'layout', purpose: 'Titles and subtitles with the right heading level.' },
    { slug: 'text', name: 'Text', group: 'layout', purpose: 'Body copy with control over the element it renders.' },
    { slug: 'strong', name: 'Strong', group: 'layout', purpose: 'Marks text as important with a strong element.' },
    { slug: 'em', name: 'Em', group: 'layout', purpose: 'Emphasises text with an em element.' },
    { slug: 'quote', name: 'Quote', group: 'layout', purpose: 'An inline quotation with its own quotation marks.' },
    { slug: 'blockquote', name: 'BlockQuote', group: 'layout', purpose: 'A quoted passage set apart from the text around it.' },
    { slug: 'code', name: 'Code', group: 'layout', purpose: 'An inline code snippet.' },
    { slug: 'kbd', name: 'Kbd', group: 'layout', purpose: 'A keyboard key or shortcut.' },
    { slug: 'link', name: 'Link', group: 'layout', purpose: 'An anchor for pages and external URLs.' },
    { slug: 'label', name: 'Label', group: 'layout', purpose: 'A native label that names a form control.' },

    // Forms
    { slug: 'text-field', name: 'TextField', group: 'forms', purpose: 'A single-line input with leading and trailing slots.' },
    { slug: 'text-area', name: 'TextArea', group: 'forms', purpose: 'A multi-line text input.' },
    { slug: 'number-field', name: 'NumberField', group: 'forms', purpose: 'A numeric input with step buttons and a scrub area.' },
    { slug: 'otp-field', name: 'OTPField', group: 'forms', purpose: 'One-time code slots that fill left to right and accept paste.' },
    { slug: 'checkbox', name: 'Checkbox', group: 'forms', purpose: 'A single on, off or mixed choice.' },
    { slug: 'checkbox-group', name: 'CheckboxGroup', group: 'forms', purpose: 'Several checkboxes that share one value.' },
    { slug: 'checkbox-cards', name: 'CheckboxCards', group: 'forms', purpose: 'Multi-select where each option is a card.' },
    { slug: 'radio', name: 'Radio', group: 'forms', purpose: 'A single radio button for custom layouts.' },
    { slug: 'radio-group', name: 'RadioGroup', group: 'forms', purpose: 'Pick one option from a set.' },
    { slug: 'radio-cards', name: 'RadioCards', group: 'forms', purpose: 'Single-select where each option is a card.' },
    { slug: 'switch', name: 'Switch', group: 'forms', purpose: 'An on/off toggle that submits like a checkbox.' },
    { slug: 'slider', name: 'Slider', group: 'forms', purpose: 'Pick a number or a range by dragging.' },
    { slug: 'select', name: 'Select', group: 'forms', purpose: 'Choose one value from a dropdown list.' },
    { slug: 'combobox', name: 'Combobox', group: 'forms', purpose: 'A dropdown you can type into to filter the options.' },
    { slug: 'autocomplete', name: 'Autocomplete', group: 'forms', purpose: 'A text input with suggestions; the value is what you type.' },
    { slug: 'field', name: 'Field', group: 'forms', purpose: 'Wires a label, help text and an error to any control.' },
    { slug: 'fieldset', name: 'Fieldset', group: 'forms', purpose: 'Groups related controls under one legend.' },
    { slug: 'form', name: 'Form', group: 'forms', purpose: 'Validates its fields before submitting and focuses the first error.' },

    // Buttons and toggles
    { slug: 'button', name: 'Button', group: 'buttons', purpose: 'Triggers an action or submits a form.' },
    { slug: 'toggle', name: 'Toggle', group: 'buttons', purpose: 'A button that stays pressed.' },
    { slug: 'toggle-group', name: 'ToggleGroup', group: 'buttons', purpose: 'A set of toggles, single or multiple.' },
    { slug: 'toolbar', name: 'Toolbar', group: 'buttons', purpose: 'A row of controls that is one tab stop.' },

    // Overlays and menus
    { slug: 'dialog', name: 'Dialog', group: 'overlays', purpose: 'A modal window that traps focus until it closes.' },
    { slug: 'alert-dialog', name: 'AlertDialog', group: 'overlays', purpose: 'A dialog that asks the user to confirm or cancel.' },
    { slug: 'drawer', name: 'Drawer', group: 'overlays', purpose: 'A panel that slides in from an edge, with drag to close.' },
    { slug: 'popover', name: 'Popover', group: 'overlays', purpose: 'A floating surface anchored to a trigger.' },
    { slug: 'hover-card', name: 'HoverCard', group: 'overlays', purpose: 'A preview card on hover or focus.' },
    { slug: 'tooltip', name: 'Tooltip', group: 'overlays', purpose: 'A short hint on hover or focus.' },
    { slug: 'dropdown-menu', name: 'DropdownMenu', group: 'overlays', purpose: 'A menu opened from a button, with submenus.' },
    { slug: 'context-menu', name: 'ContextMenu', group: 'overlays', purpose: 'A menu opened with a right click or long press.' },
    { slug: 'menubar', name: 'Menubar', group: 'overlays', purpose: 'An application-style bar of menus.' },
    { slug: 'command', name: 'Command', group: 'overlays', purpose: 'A command palette for searchable actions.' },

    // Navigation and disclosure
    { slug: 'breadcrumb', name: 'Breadcrumb', group: 'navigation', purpose: 'Shows where the current page sits in the hierarchy.' },
    { slug: 'tabs', name: 'Tabs', group: 'navigation', purpose: 'Switch between views in place.' },
    { slug: 'tab-nav', name: 'TabNav', group: 'navigation', purpose: 'Tabs that are links, one URL per tab.' },
    { slug: 'navigation-menu', name: 'NavigationMenu', group: 'navigation', purpose: 'Site navigation with dropdown panels.' },
    { slug: 'steps', name: 'Steps', group: 'navigation', purpose: 'Progress through a multi-step flow.' },
    { slug: 'accordion', name: 'Accordion', group: 'navigation', purpose: 'Stacked sections that expand one or many at a time.' },
    { slug: 'collapsible', name: 'Collapsible', group: 'navigation', purpose: 'Show or hide one block of content.' },
    { slug: 'disclosure', name: 'Disclosure', group: 'navigation', purpose: 'Several show/hide items, composed or from an array.' },
    { slug: 'tree', name: 'Tree', group: 'navigation', purpose: 'Nested items like folders and files.' },
    { slug: 'minimap', name: 'Minimap', group: 'navigation', purpose: 'A scaled overview that jumps between sections.' },

    // Feedback and status
    { slug: 'badge', name: 'Badge', group: 'feedback', purpose: 'A small label for status or a count.' },
    { slug: 'callout', name: 'Callout', group: 'feedback', purpose: 'A message that needs attention.' },
    { slug: 'progress', name: 'Progress', group: 'feedback', purpose: 'How far a task has got.' },
    { slug: 'meter', name: 'Meter', group: 'feedback', purpose: 'A bounded measurement such as usage or a score.' },
    { slug: 'spinner', name: 'Spinner', group: 'feedback', purpose: 'Something is loading.' },
    { slug: 'skeleton', name: 'Skeleton', group: 'feedback', purpose: 'A placeholder in the shape of the content to come.' },
    { slug: 'toast', name: 'Toast', group: 'feedback', purpose: 'Stacked notifications with swipe to dismiss.' },
    { slug: 'live-region', name: 'LiveRegion', group: 'feedback', purpose: 'Announces updates to screen readers.' },

    // Data display
    { slug: 'avatar', name: 'Avatar', group: 'data', purpose: 'A person or brand, as an image or initials.' },
    { slug: 'avatar-group', name: 'AvatarGroup', group: 'data', purpose: 'Several avatars stacked with an overflow count.' },
    { slug: 'table', name: 'Table', group: 'data', purpose: 'Rows and columns of data.' },
    { slug: 'data-list', name: 'DataList', group: 'data', purpose: 'Key and value pairs, such as a profile or metadata.' },

    // Utilities
    { slug: 'theme', name: 'Theme', group: 'utilities', purpose: 'Sets appearance, accent, radius and scale for everything inside.' },
    { slug: 'direction-provider', name: 'DirectionProvider', group: 'utilities', purpose: 'Sets the reading direction once for right-to-left apps.' },
    { slug: 'slot', name: 'Slot', group: 'utilities', purpose: 'Slot, mergeProps and composeRefs for building your own parts.' },
    { slug: 'visually-hidden', name: 'VisuallyHidden', group: 'utilities', purpose: 'Content for screen readers only.' }
]

const bySlug = new Map(components.map((component) => [component.slug, component]))
const groupById = new Map(componentGroups.map((group) => [group.id, group]))

export const getComponentMeta = (slug: string) => bySlug.get(slug)

export const getComponentGroup = (id: ComponentGroupId) => groupById.get(id)

/** Components of one group, in the order they are listed above. */
export const componentsInGroup = (id: ComponentGroupId) => components.filter((component) => component.group === id)

/** The group a docs path belongs to, for breadcrumbs. */
export const getGroupForPath = (pathname: string | null) => {
    const slug = pathname?.match(/^\/docs\/components\/([^/]+)/)?.[1]
    const meta = slug ? bySlug.get(slug) : undefined
    return meta ? groupById.get(meta.group) : undefined
}
