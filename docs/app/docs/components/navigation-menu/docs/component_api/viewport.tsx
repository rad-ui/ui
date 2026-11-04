const data = {
    name: "Viewport",
    description: "Optional shared container for every content panel. Render it once inside Root, after the items; open panels show inside it and it sets --rad-navigation-menu-viewport-width and --rad-navigation-menu-viewport-height to the open panel's size so CSS can animate between panels.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "asChild", info_tooltips: "Render your own element instead of the default div." }, type: "boolean", default: "false" },
    {
      prop: {
        name: "side",
        info_tooltips: "Side of the open item's trigger to place the viewport on. Any positioning prop anchors the viewport to the trigger with collision handling; without them it's laid out by CSS."
      },
      type: "'top' | 'right' | 'bottom' | 'left'",
      default: "'bottom'",
    },
    {
      prop: {
        name: "align",
        info_tooltips: "Alignment against the trigger."
      },
      type: "'start' | 'center' | 'end'",
      default: "'center'",
    },
    {
      prop: {
        name: "sideOffset",
        info_tooltips: "Distance from the trigger in px."
      },
      type: "number",
      default: "0",
    },
    {
      prop: {
        name: "alignOffset",
        info_tooltips: "Shift along the trigger in px."
      },
      type: "number",
      default: "0",
    },
    {
      prop: {
        name: "anchor",
        info_tooltips: "Element, virtual element, ref or function to position against instead of the open trigger."
      },
      type: "Element | VirtualElement | RefObject | () => Element",
      default: "--",
    },
    {
      prop: {
        name: "collisionAvoidance",
        info_tooltips: "Per-axis collision handling: side flip/shift/none, align shift/flip/none."
      },
      type: "{ side?, align?, fallbackAxisSide? }",
      default: "flip side, shift align",
    },
    {
      prop: {
        name: "collisionPadding",
        info_tooltips: "Space in px to keep from the boundary edges."
      },
      type: "number",
      default: "5",
    },
    {
      prop: {
        name: "collisionBoundary",
        info_tooltips: "Element(s) to stay inside instead of the clipping ancestors."
      },
      type: "Element | Element[]",
      default: "--",
    },
    {
      prop: {
        name: "positionMethod",
        info_tooltips: "CSS position of the viewport."
      },
      type: "'absolute' | 'fixed'",
      default: "'absolute'",
    },
    {
      prop: {
        name: "sticky",
        info_tooltips: "Keep the viewport in view after its trigger scrolls out of the boundary."
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
    }
  ]
}

export default data
