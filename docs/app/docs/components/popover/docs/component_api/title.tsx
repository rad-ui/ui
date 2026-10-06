const data = {
    name: "Title",
    description: "Heading that names the popover. Content references it via aria-labelledby unless you pass aria-label or aria-labelledby.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "id", info_tooltips: "Explicit id. Generated when omitted." }, type: "string", default: "--" },
        { prop: { name: "asChild", info_tooltips: "Merges props onto the single child element instead of rendering a <h2>." }, type: "boolean", default: "false" },
        { prop: { name: "className", info_tooltips: "Class name applied to the element." }, type: "string", default: "--" },
        { prop: { name: "children", info_tooltips: "The title content." }, type: "ReactNode", default: "--" }
    ]
}

export default data
