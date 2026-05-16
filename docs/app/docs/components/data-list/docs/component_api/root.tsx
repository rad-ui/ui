const data = {
    name: "Root",
    description: "The root DataList container. Wraps all items and controls the size of the list.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" },
        { name: "Description", id: "description" }
    ],
    data: [
        { prop: "size", type: "string", default: '""', description: "Controls font size and row gap. One of: small, medium, large." },
        { prop: "customRootClass", type: "string", default: '""', description: "Overrides the Theme classNamespace for this component only." },
        { prop: "className", type: "string", default: '""', description: "Additional CSS classes applied to the root element." }
    ]
}

export default data
