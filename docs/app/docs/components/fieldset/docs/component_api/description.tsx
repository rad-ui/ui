const data = {
    name: "Description",
    description: "Optional descriptive text for the grouped controls.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "children", info_tooltips: "Description content." }, type: "ReactNode", default: "--" },
        { prop: { name: "id", info_tooltips: "Use with aria-describedby when controls need the description announced." }, type: "string", default: "--" }
    ]
}

export default data
