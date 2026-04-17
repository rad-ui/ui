const data = {
    name: "Link",
    description: "A styled anchor element.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "href", info_tooltips: "The URL the link points to." }, type: "string", default: '"#"' },
        { prop: { name: "size", info_tooltips: "Controls the font size of the link." }, type: "string", default: '""' },
        { prop: { name: "color", info_tooltips: "Accent color applied to the link." }, type: "string", default: '""' },
        { prop: { name: "asChild", info_tooltips: "Merges props onto the immediate child element instead of rendering an anchor." }, type: "boolean", default: "false" },
        { prop: { name: "customRootClass", info_tooltips: "Override the root CSS class." }, type: "string", default: '""' }
    ]
}

export default data
