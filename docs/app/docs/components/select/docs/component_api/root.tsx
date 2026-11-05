const data = {
    name: "Root",
    description: "The root Select component.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "multiple", info_tooltips: "Allow several selected values. value, defaultValue and onValueChange use arrays, and picking an option toggles it and keeps the list open." }, type: "boolean", default: "false" },
        { prop: { name: "value", info_tooltips: "Controlled selected value, or an array of values with multiple." }, type: "string | string[]", default: "--" },
        { prop: { name: "defaultValue", info_tooltips: "Initial selected value (uncontrolled), or an array with multiple." }, type: "string | string[]", default: "--" },
        { prop: { name: "open", info_tooltips: "Controlled open state." }, type: "boolean", default: "--" },
        { prop: { name: "disabled", info_tooltips: "Disables the select." }, type: "boolean", default: "false" },
        { prop: { name: "onValueChange", info_tooltips: "Callback when selection changes." }, type: "function", default: "--" },
        { prop: { name: "onOpenChange", info_tooltips: "Callback when open state changes." }, type: "function", default: "--" },
        { prop: { name: "alignItemWithTrigger", info_tooltips: "Open the list over the trigger with the selected option lined up on it, like a native select. Falls back to normal positioning when nothing is selected (and with multiple)." }, type: "boolean", default: "false" },
        { prop: { name: "items", info_tooltips: "Labels by value (or { value, label } pairs) so the trigger shows the selected label before the list mounts, even when items are rendered inside your own components." }, type: "Record<string, string> | { value: string; label: string }[]", default: "--" },
        { prop: { name: "onOpenChangeComplete", info_tooltips: "Called with true after the open animation finishes and with false after the close animation finishes (immediately when nothing animates)." }, type: "(open: boolean) => void", default: "--" },
        { prop: { name: "modal", info_tooltips: "While the list is open, lock page scroll and let an outside press only close the list instead of reaching the page." }, type: "boolean", default: "false" },
    {
      prop: {
        name: "anchor",
        info_tooltips: "Element, virtual element (anything with getBoundingClientRect), ref or function to position against instead of the trigger."
      },
      type: "Element | VirtualElement | RefObject | () => Element",
      default: "--",
    },
    {
      prop: {
        name: "positionMethod",
        info_tooltips: "CSS position of the floating element."
      },
      type: "\"absolute\" | \"fixed\"",
      default: "\"fixed\"",
    },
    {
      prop: {
        name: "collisionAvoidance",
        info_tooltips: "How it avoids overflowing its boundary: side flip/shift/none, align flip/shift/none, and whether to fall back to the other axis."
      },
      type: "{ side?, align?, fallbackAxisSide? }",
      default: "--",
    },
    {
      prop: {
        name: "sticky",
        info_tooltips: "Keep it in view after the trigger scrolls out of the boundary."
      },
      type: "boolean",
      default: "false",
    },
    {
      prop: {
        name: "disableAnchorTracking",
        info_tooltips: "Don't re-position when the trigger's layout shifts; scroll and resize still update it."
      },
      type: "boolean",
      default: "false",
    },
    {
      prop: {
        name: "filter",
        info_tooltips: "Decides whether an option shows for the typed text, from its label and the text. null turns filtering off. Defaults to a case- and accent-insensitive contains."
      },
      type: "(label, query) => boolean | null",
      default: "--",
    },
    {
      prop: {
        name: "limit",
        info_tooltips: "Show at most this many matching options."
      },
      type: "number",
      default: "--",
    },
    {
      prop: {
        name: "locale",
        info_tooltips: "Locale for the default filter's case folding."
      },
      type: "Intl.LocalesArgument",
      default: "--",
    },
    {
      prop: {
        name: "readOnly",
        info_tooltips: "Show the value but don't let it change."
      },
      type: "boolean",
      default: "false",
    },
    {
      prop: {
        name: "form",
        info_tooltips: "id of a form elsewhere in the page that the value submits with."
      },
      type: "string",
      default: "--",
    },
    {
      prop: {
        name: "inputRef",
        info_tooltips: "Ref to the hidden form control."
      },
      type: "Ref<HTMLSelectElement>",
      default: "--",
    },
    {
      prop: {
        name: "autoComplete",
        info_tooltips: "autocomplete for the hidden form control, for browser autofill."
      },
      type: "string",
      default: "--",
    },
    {
      prop: {
        name: "finalFocus",
        info_tooltips: "Where focus goes when the list closes: the trigger, false, a ref or a function."
      },
      type: "boolean | RefObject | () => HTMLElement",
      default: "true",
    },
    {
      prop: {
        name: "highlightItemOnHover",
        info_tooltips: "Highlight options as the pointer moves over them."
      },
      type: "boolean",
      default: "true",
    },
    {
      prop: {
        name: "onItemHighlighted",
        info_tooltips: "Called with the highlighted option's value and index."
      },
      type: "(value, { index }) => void",
      default: "--",
    },
    {
      prop: {
        name: "loop",
        info_tooltips: "Arrow keys wrap from the last option to the first."
      },
      type: "boolean",
      default: "false",
    },
    {
      prop: {
        name: "actionsRef",
        info_tooltips: "Ref with close(), to close it from code (reason 'imperative-action')."
      },
      type: "Ref<{ close(): void }>",
      default: "--",
    }
  ]
}

export default data
