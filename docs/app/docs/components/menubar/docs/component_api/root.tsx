const data = {
    name: "Root",
    description: "The root Menubar container.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value", info_tooltips: "Controlled open menu value." }, type: "string", default: "--" },
        { prop: { name: "onValueChange", info_tooltips: "Callback when the active menu changes." }, type: "function", default: "--" },
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: '""' },
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
        name: "highlightItemOnHover",
        info_tooltips: "Highlight items as the pointer moves over them."
      },
      type: "boolean",
      default: "true",
    },
    {
      prop: {
        name: "onItemHighlighted",
        info_tooltips: "Called when the highlighted item changes, with the item element and its index."
      },
      type: "(item, { index }) => void",
      default: "--",
    },
    {
      prop: {
        name: "closeParentOnEsc",
        info_tooltips: "On a submenu: Escape closes the whole menu instead of only this submenu."
      },
      type: "boolean",
      default: "false",
    },
    {
      prop: {
        name: "actionsRef",
        info_tooltips: "Ref with close(), to close it from code (reason 'imperative-action')."
      },
      type: "Ref<{ close(): void }>",
      default: "--",
    }
  ]
}

export default data
