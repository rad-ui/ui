const data = {
    name: "ItemIndicator",
    description: "ItemIndicator: shows its children, such as a check icon, while its checkbox or radio item is checked.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "forceMount", info_tooltips: "Keep it rendered while unchecked." }, type: "boolean", default: "false" }
    ]
}

export default data
