const data = {
    name: "Label",
    description: "The label part of a key-value pair. Renders as a <dt> element. Supports an independent accent color.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" },
        { name: "Description", id: "description" }
    ],
    data: [
        { prop: "color", type: "string", default: '""', description: "Accent color applied to this label only, independent of the root. Sets data-rad-ui-accent-color on the element." },
        { prop: "className", type: "string", default: '""', description: "Additional CSS classes applied to the label element." }
    ]
}

export default data
