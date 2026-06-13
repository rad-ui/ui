const data = {
    name: "Item",
    description: "A single key-value row. Renders as a CSS subgrid row spanning both label and value columns.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" },
        { name: "Description", id: "description" }
    ],
    data: [
        { prop: "className", type: "string", default: '""', description: "Additional CSS classes applied to the item element." }
    ]
}

export default data
