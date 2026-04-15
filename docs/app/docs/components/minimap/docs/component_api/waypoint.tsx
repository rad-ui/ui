const data = {
    name: "Waypoint",
    description: "Registers a section in the minimap.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "id*", info_tooltips: "Unique identifier linking the waypoint to a Minimap.Item." }, type: "string", default: "--" },
        { prop: { name: "label", info_tooltips: "Accessible label for the waypoint." }, type: "string", default: "--" }
    ]
}

export default data
