const data = {
    name: "Root",
    description: "Holds the input text and the suggestion list state.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value", info_tooltips: "Controlled input text." }, type: "string", default: "--" },
        { prop: { name: "defaultValue", info_tooltips: "Initial text when uncontrolled." }, type: "string", default: "\"\"" },
        { prop: { name: "onValueChange", info_tooltips: "Called with the text as the user types or picks a suggestion." }, type: "(value: string) => void", default: "--" },
        { prop: { name: "open", info_tooltips: "Controlled open state of the suggestions." }, type: "boolean", default: "--" },
        { prop: { name: "onOpenChange", info_tooltips: "Called when the suggestions open or close." }, type: "(open: boolean) => void", default: "--" },
        { prop: { name: "disabled", info_tooltips: "Disable the input." }, type: "boolean", default: "false" },
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
    },
    {
      prop: {
        name: "autoHighlight",
        info_tooltips: "Highlight the first suggestion as you type, so Enter picks it. 'always' also highlights it on open."
      },
      type: "boolean | 'always'",
      default: "false",
    },
    {
      prop: {
        name: "openOnInputClick",
        info_tooltips: "Open the suggestions when the input is clicked."
      },
      type: "boolean",
      default: "false",
    },
    {
      prop: {
        name: "submitOnItemClick",
        info_tooltips: "Submit the input's form when a suggestion is picked."
      },
      type: "boolean",
      default: "false",
    },
    {
      prop: {
        name: "mode",
        info_tooltips: "list: filtered; both: filtered with an inline preview of the highlighted suggestion; inline: preview only; none: no filtering or preview."
      },
      type: "\"list\" | \"both\" | \"inline\" | \"none\"",
      default: "\"list\"",
    }
  ]
}

export default data
