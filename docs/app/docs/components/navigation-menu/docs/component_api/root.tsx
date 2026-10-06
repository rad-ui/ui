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
        { prop: { name: "onValueChange", info_tooltips: "Callback when the active item changes." }, type: "function", default: "--" }
    ]
}

export default data
