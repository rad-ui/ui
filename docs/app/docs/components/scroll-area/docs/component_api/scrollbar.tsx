const data = {
    name: "Scrollbar",
    description: "The scrollbar track element.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "orientation", info_tooltips: "The axis the scrollbar controls." }, type: "enum", enum_values: ["horizontal", "vertical"], default: "vertical" },
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: '""' }
    ]
}

export default data
