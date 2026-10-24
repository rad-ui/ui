const data = {
    name: "Input",
    description: "One character slot. Render one per character, in order. The first offers autocomplete=\"one-time-code\".",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "aria-label", info_tooltips: "Accessible name for the slot." }, type: "string", default: "\"Character n of length\"" },
        { prop: { name: "asChild", info_tooltips: "Render the child element instead of an input." }, type: "boolean", default: "false" }
    ]
}

export default data
