const data = {
  name: "Content",
  description: "The content displayed inside the tooltip.",
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
        info_tooltips: "The tooltip contents rendered inside the floating panel."
      },
      type: "ReactNode",
      default: "--",
    },
    {
      prop: {
        name: "showArrow",
        info_tooltips: "Whether to render the floating arrow."
      },
      type: "boolean",
      default: "true",
    },
    {
      prop: {
        name: "className",
        info_tooltips: "Additional CSS class name for styling."
      },
      type: "string",
      default: "--",
    }
  ]
};

export default data; 
