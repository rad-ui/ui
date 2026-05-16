const data = {
    name: "Value",
    description: "The value part of a key-value pair. Renders as a <dd> element.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" },
        { name: "Description", id: "description" }
    ],
    data: [
        { prop: "className", type: "string", default: '""', description: "Additional CSS classes applied to the value element." }
    ]
}

export default data
