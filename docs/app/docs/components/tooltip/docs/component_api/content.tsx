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
        name: "anchor",
        info_tooltips: "Element, virtual element (anything with getBoundingClientRect), ref or function to position against instead of the trigger."
      },
      type: "Element | VirtualElement | RefObject | () => Element",
      default: "--",
    },
    {
      prop: {
        name: "positionMethod",
        info_tooltips: "CSS position of the floating element."
      },
      type: "\"absolute\" | \"fixed\"",
      default: "\"fixed\"",
    },
    {
      prop: {
        name: "collisionAvoidance",
        info_tooltips: "How it avoids overflowing its boundary: side flip/shift/none, align flip/shift/none, and whether to fall back to the other axis."
      },
      type: "{ side?, align?, fallbackAxisSide? }",
      default: "--",
    },
    {
      prop: {
        name: "sticky",
        info_tooltips: "Keep it in view after the trigger scrolls out of the boundary."
      },
      type: "boolean",
      default: "false",
    },
    {
      prop: {
        name: "disableAnchorTracking",
        info_tooltips: "Don't re-position when the trigger's layout shifts; scroll and resize still update it."
      },
      type: "boolean",
      default: "false",
    },
    {
      prop: {
        name: "arrowPadding",
        info_tooltips: "Minimum distance in px between the arrow and the edges."
      },
      type: "number",
      default: "4",
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
