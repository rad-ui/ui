const data = {
    name: "Item",
    description: "A button that scrolls to the matching waypoint. Exposes data-in-view while its waypoint is visible. Give it visible text or an aria-label.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value*", info_tooltips: "Value of the Minimap.Waypoint this item tracks and scrolls to." }, type: "string", default: "--" }
    ]
}

export default data
