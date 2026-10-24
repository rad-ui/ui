const data = {
  name: "Trigger",
  description: "The element that triggers the tooltip. Must be an interactive element.",
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
        name: "asChild",
        info_tooltips: "Render the trigger as the child element."
      },
      type: "boolean",
      default: "false",
    },
    {
      prop: {
        name: "children",
        info_tooltips: "The interactive element that receives hover and focus handlers."
      },
      type: "ReactNode",
      default: "--",
    },
        { prop: { name: "handle", info_tooltips: "Open the shared tooltip connected to this handle." }, type: "Handle", default: "--" },
        { prop: { name: "payload", info_tooltips: "Data for the tooltip's content." }, type: "unknown", default: "--" },
        { prop: { name: "delay", info_tooltips: "With handle, ms the pointer rests before opening. Focus opens at once." }, type: "number", default: "0" }
    ]
};

export default data; 
