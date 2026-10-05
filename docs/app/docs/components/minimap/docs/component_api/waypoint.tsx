const data = {
    name: "Waypoint",
    description: "Registers a section in the minimap.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value*", info_tooltips: "Unique identifier linking the waypoint to the Minimap.Item with the same value. Must be rendered inside Minimap.Provider." }, type: "string", default: "--" }
    ]
}

export default data
