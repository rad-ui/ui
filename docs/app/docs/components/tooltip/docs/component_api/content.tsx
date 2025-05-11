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
        name: "side",
        info_tooltips: "The preferred side of the trigger to render against."
      },
      type: "enum",
      enum_values: ["top", "right", "bottom", "left"],
      default: "top",
    },
    {
      prop: {
        name: "sideOffset",
        info_tooltips: "The distance in pixels from the trigger."
      },
      type: "number",
      default: "5",
    },
    {
      prop: {
        name: "align",
        info_tooltips: "The preferred alignment against the trigger."
      },
      type: "enum",
      enum_values: ["start", "center", "end"],
      default: "center",
    },
    {
      prop: {
        name: "alignOffset",
        info_tooltips: "An offset in pixels from the edge of the boundary."
      },
      type: "number",
      default: "0",
    },
    {
      prop: {
        name: "avoidCollisions",
        info_tooltips: "When true, overrides the side and align preferences to prevent collisions with boundary edges."
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