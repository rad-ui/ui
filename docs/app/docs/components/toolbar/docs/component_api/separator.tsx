const data = {
    name: "Separator",
    description: "A visual divider between toolbar groups. Defaults to the opposite orientation of the toolbar.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "orientation", info_tooltips: "Overrides the orientation inferred from the toolbar." }, type: '"horizontal" | "vertical"', default: "inferred" },
        { prop: { name: "className", info_tooltips: "Class name applied to the separator." }, type: "string", default: "--" }
    ]
}

export default data
