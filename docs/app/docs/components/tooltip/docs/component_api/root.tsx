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
    }
  ]
};

export default data; 
