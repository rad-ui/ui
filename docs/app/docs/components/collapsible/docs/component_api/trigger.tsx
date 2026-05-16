const data = {
    name: "Trigger",
    description: "The button that toggles the collapsible open/closed.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "asChild", info_tooltips: "Merges props onto the immediate child element." }, type: "boolean", default: "false" },
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: '""' }
    ]
}

export default data
