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
        { prop: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Preferred side of the trigger. Flips when there isn't room." },
        { prop: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment against the trigger on the cross axis." },
        { prop: "sideOffset", type: "number", default: "10", description: "Distance from the trigger in px (leaves room for the arrow)." },
        { prop: "alignOffset", type: "number", default: "0", description: "Shift along the cross axis in px." },
        { prop: "className", type: "string", default: '""', description: "Additional CSS classes applied to the content element." }
    ]
}

export default data
