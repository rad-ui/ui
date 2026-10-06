const data = {
    name: "Provider",
    description: "Wraps both the waypoints and the minimap so they can share in-view state.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "scrollable", info_tooltips: "Scroll the provider element itself when an item is clicked. Otherwise the nearest scrollable ancestor of the waypoint is used, falling back to the document." }, type: "boolean", default: "false" }
    ]
}

export default data
