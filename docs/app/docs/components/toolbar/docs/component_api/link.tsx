const data = {
    name: "Link",
    description: "A link inside the toolbar. Part of the toolbar's single tab stop.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "href", info_tooltips: "Destination URL." }, type: "string", default: '"#"' },
        { prop: { name: "aria-label", info_tooltips: "Accessible name when the link text is not descriptive." }, type: "string", default: "--" },
        { prop: { name: "className", info_tooltips: "Class name applied to the link." }, type: "string", default: "--" },
        { prop: { name: "asChild", info_tooltips: "Merges props onto the single child element." }, type: "boolean", default: "false" }
    ]
}

export default data
