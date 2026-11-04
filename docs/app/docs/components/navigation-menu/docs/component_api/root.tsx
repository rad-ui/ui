const data = {
    name: "Root",
    description: "The root NavigationMenu component.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value", info_tooltips: "Controlled open item value." }, type: "string", default: "--" },
        { prop: { name: "loop", info_tooltips: "Whether arrow key navigation wraps between top-level triggers." }, type: "boolean", default: "true" },
        { prop: { name: "contentLoop", info_tooltips: "Default wrap behavior for roving focus inside opened content panels." }, type: "boolean", default: "true" },
        { prop: { name: "aria-label", info_tooltips: "Accessible name for the <nav> landmark the root renders. Recommended when a page has more than one nav." }, type: "string", default: "--" },
        { prop: { name: "onValueChange", info_tooltips: "Callback when the active item changes." }, type: "function", default: "--" },
    {
      prop: {
        name: "delay",
        info_tooltips: "ms the pointer rests on a trigger before its panel opens."
      },
      type: "number",
      default: "0",
    },
    {
      prop: {
        name: "closeDelay",
        info_tooltips: "ms after the pointer leaves before the panel closes."
      },
      type: "number",
      default: "150",
    },
    {
      prop: {
        name: "orientation",
        info_tooltips: "vertical moves between triggers with ArrowUp/Down and opens panels with ArrowRight."
      },
      type: "\"horizontal\" | \"vertical\"",
      default: "\"horizontal\"",
    },
    {
      prop: {
        name: "onOpenChangeComplete",
        info_tooltips: "Called after a panel's open or close animation finishes."
      },
      type: "(open) => void",
      default: "--",
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
