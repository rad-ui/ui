const data = {
    name: "Content",
    description: "The floating card panel that appears on hover. Accepts a size prop to control padding and max-width.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" },
        { name: "Description", id: "description" }
    ],
    data: [
        { prop: "size", type: "string", default: '""', description: "Controls the padding, max-width, and font size of the card. One of: small, medium, large." },
        { prop: "className", type: "string", default: '""', description: "Additional CSS classes applied to the content element." }
    ]
}

export default data
