const data = {
    name: "Label",
    description: "Names the control. Its htmlFor points at the control automatically.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "asChild", info_tooltips: "Render the child element instead of a label." }, type: "boolean", default: "false" }
    ]
}

export default data
