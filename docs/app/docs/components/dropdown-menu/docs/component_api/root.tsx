const data = {
    name: "Root",
    description: "The root DropdownMenu component.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "open", info_tooltips: "Controlled open state." }, type: "boolean", default: "--" },
        { prop: { name: "defaultOpen", info_tooltips: "Initial open state (uncontrolled)." }, type: "boolean", default: "false" },
        { prop: { name: "modal", info_tooltips: "Whether the menu is modal." }, type: "boolean", default: "true" },
        { prop: { name: "onOpenChange", info_tooltips: "Callback when open state changes." }, type: "function", default: "--" }
    ]
}

export default data
