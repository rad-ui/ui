const data = {
    name: "Separator",
    description: "A divider between options or groups, hidden from assistive technology.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "className", info_tooltips: "Classes for the divider." }, type: "string", default: "--" }
    ]
}

export default data
