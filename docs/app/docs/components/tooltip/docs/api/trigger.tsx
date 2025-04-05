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
    },
    {
      name: "",
      id: "info_tooltips",
    }
  ],
  data: [
    {
      prop: {
        name: "asChild",
        info_tooltips: "When true, tooltip will be rendered in the DOM as the child component of the trigger element rather than as a sibling."
      },
      type: "boolean",
      default: "false",
    }
  ]
};

export default data; 