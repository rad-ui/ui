const data = {
  name: "Root",
  description: "The wrapper component that provides context for the tooltip.",
  columns: [
    {
      name: "Prop",
      id: "prop",
    },
    {
      name: "Type",
      id: "type",
    },
    {
      name: "Default",
      id: "default",
    }
  ],
  data: [
    {
      prop: {
        name: "children",
        info_tooltips: "The trigger and content elements rendered inside Tooltip.Root."
      },
      type: "ReactNode",
      default: "--",
    },
    {
      prop: {
        name: "placement",
        info_tooltips: "Preferred floating placement for the tooltip content."
      },
      type: "enum",
      enum_values: ["top", "bottom", "left", "right", "top-start", "top-end", "bottom-start", "bottom-end", "left-start", "left-end", "right-start", "right-end"],
      default: "top",
    },
    {
      prop: { name: "open", info_tooltips: "Controlled open state." },
      type: "boolean",
      default: "--",
    },
    {
      prop: { name: "defaultOpen", info_tooltips: "Initial open state when uncontrolled." },
      type: "boolean",
      default: "false",
    },
    {
      prop: { name: "onOpenChange", info_tooltips: "Called with the next open state whenever it changes." },
      type: "(open: boolean) => void",
      default: "--",
    },
    {
      prop: { name: "openDelay", info_tooltips: "Delay in ms before opening on hover. Focus opens immediately. Inside Tooltip.Provider, defaults to its delay." },
      type: "number",
      default: "0",
    },
    {
      prop: { name: "closeDelay", info_tooltips: "Delay in ms before closing after the pointer leaves. Inside Tooltip.Provider, defaults to its delay." },
      type: "number",
      default: "0",
    },
    {
      prop: { name: "customRootClass", info_tooltips: "Override the generated class namespace." },
      type: "string",
      default: '""',
    },
        { prop: { name: "handle", info_tooltips: "Connects detached triggers made with Tooltip.createHandle(); children can be a function of the hovered trigger's payload." }, type: "Handle", default: "--" },
        { prop: { name: "trackCursorAxis", info_tooltips: "Follow the pointer along this axis while it's over the trigger. A tracking tooltip closes when the pointer leaves." }, type: "'none' | 'x' | 'y' | 'both'", default: "'none'" },
        { prop: { name: "onOpenChangeComplete", info_tooltips: "Called with true after the open animation finishes and with false after the close animation finishes (immediately when nothing animates)." }, type: "(open: boolean) => void", default: "--" },
    {
      prop: {
        name: "disabled",
        info_tooltips: "Never open, and close if open."
      },
      type: "boolean",
      default: "false",
    },
    {
      prop: {
        name: "disableHoverablePopup",
        info_tooltips: "Close as soon as the pointer leaves the trigger instead of letting it move onto the tooltip."
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
};

export default data; 
