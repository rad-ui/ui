const data = {
    name: "Root",
    description: "The root component for the Popover. Owns the open state and the parts rendered inside it.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "open", info_tooltips: "Controls the open state of the popover when used as a controlled component." }, type: "boolean", default: "--" },
        { prop: { name: "defaultOpen", info_tooltips: "Initial open state when uncontrolled." }, type: "boolean", default: "false" },
        { prop: { name: "onOpenChange", info_tooltips: "Called with the next open state. A handler with a second parameter also gets details: reason (trigger-press, outside-press, escape-key, focus-out, close-press…), event, and cancel() to keep the current state." }, type: "(open: boolean, details) => void", default: "--" },
        { prop: { name: "modal", info_tooltips: "true traps focus and marks outside content inert while open; 'trap-focus' traps focus but the page still takes pointer input." }, type: "boolean | 'trap-focus'", default: "false" },
        { prop: { name: "className", info_tooltips: "Class name applied to the Popover root element." }, type: "string", default: "--" },
        { prop: { name: "customRootClass", info_tooltips: "Override the generated root class namespace." }, type: "string", default: '""' },
        { prop: { name: "openOnHover", info_tooltips: "Also open while the pointer rests on the trigger. Clicking still toggles." }, type: "boolean", default: "false" },
        { prop: { name: "hoverOpenDelay", info_tooltips: "With openOnHover, ms before opening." }, type: "number", default: "300" },
        { prop: { name: "hoverCloseDelay", info_tooltips: "With openOnHover, ms after the pointer leaves before closing." }, type: "number", default: "0" },
        { prop: { name: "handle", info_tooltips: "Connects triggers rendered outside the Root, made with createHandle(). Children can then be a function of the opening trigger's payload." }, type: "Handle", default: "--" },
        { prop: { name: "onOpenChangeComplete", info_tooltips: "Called with true after the open animation finishes and with false after the close animation finishes (immediately when nothing animates)." }, type: "(open: boolean) => void", default: "--" },
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
        name: "triggerId",
        info_tooltips: "With handle: the DOM id of the detached trigger the popup belongs to while open. It's anchored to that trigger and gets its payload, also when opened from code."
      },
      type: "string | null",
      default: "--",
    },
    {
      prop: {
        name: "defaultTriggerId",
        info_tooltips: "Uncontrolled triggerId: the trigger used when the popup opens without one, e.g. with defaultOpen."
      },
      type: "string | null",
      default: "--",
    }
  ]
}

export default data