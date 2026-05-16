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
        { prop: { name: "orientation", info_tooltips: "Layout orientation of the menu." }, type: "enum", enum_values: ["horizontal", "vertical"], default: "horizontal" },
        { prop: { name: "onValueChange", info_tooltips: "Callback when the active item changes." }, type: "function", default: "--" }
    ]
}

export default data
