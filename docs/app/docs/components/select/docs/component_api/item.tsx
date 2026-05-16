const data = {
    name: "Item",
    description: "A single selectable option.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value*", info_tooltips: "The value of this option." }, type: "string", default: "--" },
        { prop: { name: "disabled", info_tooltips: "Disables this option." }, type: "boolean", default: "false" },
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: '""' }
    ]
}

export default data
