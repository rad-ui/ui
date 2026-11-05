const data = {
    name: "Input",
    description: "The text input. Typing opens the suggestions; focus stays here while ArrowDown and ArrowUp move through them.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "placeholder", info_tooltips: "Placeholder text." }, type: "string", default: "--" },
        { prop: { name: "asChild", info_tooltips: "Render the child element instead of an input." }, type: "boolean", default: "false" }
    ]
}

export default data
