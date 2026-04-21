const data = {
    name: "Quote",
    description: "An inline quotation rendered as a native q element.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" },
        { name: "Description", id: "description" }
    ],
    data: [
        { prop: "truncate", type: "boolean", default: "false", description: "Truncates overflowing text with an ellipsis. Sets data-quote-truncate on the element." },
        { prop: "customRootClass", type: "string", default: '""', description: "Overrides the Theme classNamespace for this component only." },
        { prop: "className", type: "string", default: '""', description: "Additional CSS classes applied to the element." }
    ]
}

export default data
