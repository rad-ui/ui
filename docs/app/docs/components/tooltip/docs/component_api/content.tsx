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
        name: "side",
        info_tooltips: "Preferred side of the trigger. Flips when there isn't room. Overrides the Root's placement."
      },
      type: '"top" | "right" | "bottom" | "left"',
      default: "--",
    },
    {
      prop: {
        name: "align",
        info_tooltips: "Alignment against the trigger on the cross axis."
      },
      type: '"start" | "center" | "end"',
      default: '"center"',
    },
    {
      prop: {
        name: "sideOffset",
        info_tooltips: "Distance from the trigger in px."
      },
      type: "number",
      default: "5",
    },
    {
      prop: {
        name: "alignOffset",
        info_tooltips: "Shift along the cross axis in px."
      },
      type: "number",
      default: "0",
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
