const data = {
    name: "Root",
    description: "The toolbar container. Renders a toolbar role and manages roving focus across its items.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "aria-label", info_tooltips: "Accessible name for the toolbar. Required: a toolbar with no name is announced only as \"toolbar\"." }, type: "string", default: "--" },
        { prop: { name: "orientation", info_tooltips: "Direction the arrow keys move focus in, and the default separator orientation." }, type: '"horizontal" | "vertical"', default: '"horizontal"' },
        { prop: { name: "loop", info_tooltips: "Wraps focus from the last item back to the first." }, type: "boolean", default: "false" },
        { prop: { name: "dir", info_tooltips: "Reading direction used by the roving focus group." }, type: '"ltr" | "rtl"', default: '"ltr"' },
        { prop: { name: "className", info_tooltips: "Class name applied to the toolbar element." }, type: "string", default: "--" },
        { prop: { name: "asChild", info_tooltips: "Merges props onto the single child element instead of rendering a div." }, type: "boolean", default: "false" }
    ]
}

export default data
