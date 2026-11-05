const data = {
    name: "ScrubArea",
    description: "Drag over it, often a short label, to change the value like the inputs in design tools. Moving right or up increments; Shift uses largeStep. Carries data-scrubbing while dragging.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "direction", info_tooltips: "Which pointer movement changes the value." }, type: "'horizontal' | 'vertical'", default: "'horizontal'" },
        { prop: { name: "pixelSensitivity", info_tooltips: "Pixels the pointer travels for each step." }, type: "number", default: "2" },
        { prop: { name: "asChild", info_tooltips: "Render the child element instead of a span." }, type: "boolean", default: "false" }
    ]
}

export default data
