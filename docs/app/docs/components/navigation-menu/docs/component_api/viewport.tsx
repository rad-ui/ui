const data = {
    name: "Viewport",
    description: "Optional shared container for every content panel. Render it once inside Root, after the items; open panels show inside it and it sets --rad-navigation-menu-viewport-width and --rad-navigation-menu-viewport-height to the open panel's size so CSS can animate between panels.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "asChild", info_tooltips: "Render your own element instead of the default div." }, type: "boolean", default: "false" }
    ]
}

export default data
