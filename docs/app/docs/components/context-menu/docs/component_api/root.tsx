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
        { prop: { name: "modal", info_tooltips: "While open, an outside press only closes the menu, page scroll is locked and the rest of the page is hidden from assistive technology." }, type: "boolean", default: "false" }
    ]
}

export default data
