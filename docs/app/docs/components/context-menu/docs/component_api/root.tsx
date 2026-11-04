const data = {
    name: "Root",
    description: "The root ContextMenu component.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "open", info_tooltips: "Controlled open state." }, type: "boolean", default: "--" },
        { prop: { name: "onOpenChange", info_tooltips: "Callback when open state changes." }, type: "function", default: "--" },
        { prop: { name: "modal", info_tooltips: "While open, an outside press only closes the menu, page scroll is locked and the rest of the page is hidden from assistive technology." }, type: "boolean", default: "false" },
        { prop: { name: "onOpenChangeComplete", info_tooltips: "Called with true after the open animation finishes and with false after the close animation finishes (immediately when nothing animates)." }, type: "(open: boolean) => void", default: "--" },
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
