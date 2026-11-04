const data = {
    name: "Content",
    description: "The floating card panel that appears on hover. Accepts a size prop to control padding and max-width.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" },
        { name: "Description", id: "description" }
    ],
    data: [
        { prop: "size", type: "string", default: '""', description: "Controls the padding, max-width, and font size of the card. One of: small, medium, large." },
        { prop: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Preferred side of the trigger. Flips when there isn't room." },
        { prop: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment against the trigger on the cross axis." },
        { prop: "sideOffset", type: "number", default: "10", description: "Distance from the trigger in px (leaves room for the arrow)." },
        { prop: "alignOffset", type: "number", default: "0", description: "Shift along the cross axis in px." },
        { prop: "className", type: "string", default: '""', description: "Additional CSS classes applied to the content element." },
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
      default: "0",
    }
  ]
}

export default data
