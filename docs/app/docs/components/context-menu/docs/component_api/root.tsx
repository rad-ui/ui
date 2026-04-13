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
        { prop: { name: "onOpenChange", info_tooltips: "Callback when open state changes." }, type: "function", default: "--" }
    ]
}

export default data
