const data = {
    name: "Root",
    description: "The root DataList container.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "orientation", info_tooltips: "Layout direction of label/value pairs." }, type: "enum", enum_values: ["horizontal", "vertical"], default: "horizontal" },
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: '""' }
    ]
}

export default data
