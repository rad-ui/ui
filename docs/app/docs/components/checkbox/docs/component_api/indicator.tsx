const data = {
    name: "Indicator",
    description: "Renders the checkmark icon when the checkbox is checked.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "className", info_tooltips: "Additional CSS classes for the indicator." }, type: "string", default: '""' }
    ]
}

export default data
