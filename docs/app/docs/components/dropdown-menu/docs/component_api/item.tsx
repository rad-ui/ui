const data = {
    name: "Item",
    description: "A single menu item.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "disabled", info_tooltips: "Disables the item." }, type: "boolean", default: "false" },
        { prop: { name: "onSelect", info_tooltips: "Callback when the item is selected." }, type: "function", default: "--" },
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: '""' }
    ]
}

export default data
