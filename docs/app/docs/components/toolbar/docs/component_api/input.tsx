const data = {
    name: "Input",
    description: "A text field that's one stop in the toolbar's arrow-key navigation. ArrowLeft/ArrowRight move the caret and leave the field at its start or end.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "type", info_tooltips: "Input type." }, type: "string", default: "'text'" },
        { prop: { name: "aria-label", info_tooltips: "Accessible name, since toolbars rarely show visible labels." }, type: "string", default: "--" }
    ]
}

export default data
