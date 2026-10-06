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
      prop: { name: "openDelay", info_tooltips: "Delay in ms before opening on hover. Focus opens immediately." },
      type: "number",
      default: "0",
    },
    {
      prop: { name: "closeDelay", info_tooltips: "Delay in ms before closing after the pointer leaves." },
      type: "number",
      default: "0",
    },
    {
      prop: { name: "customRootClass", info_tooltips: "Override the generated class namespace." },
      type: "string",
      default: '""',
    }
  ]
};

export default data; 
