const data = {
    name: "Skeleton",
    description: "A loading placeholder. Renders children when loading is false.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "loading*", info_tooltips: "When true renders the skeleton; when false renders children." }, type: "boolean", default: "true" },
        { prop: { name: "width*", info_tooltips: "CSS width of the skeleton (e.g. '200px')." }, type: "string", default: "--" },
        { prop: { name: "height*", info_tooltips: "CSS height of the skeleton (e.g. '20px')." }, type: "string", default: "--" },
        { prop: { name: "radius", info_tooltips: "Border radius of the skeleton." }, type: "string", default: '""' },
        { prop: { name: "customRootClass", info_tooltips: "Override the root CSS class." }, type: "string", default: '""' }
    ]
}

export default data
