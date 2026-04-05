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
    }
  ]
};

export default data; 
