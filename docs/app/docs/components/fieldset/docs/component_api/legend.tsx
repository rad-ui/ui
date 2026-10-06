const data = {
    name: "Legend",
    description: "The native legend element that labels the fieldset.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "children", info_tooltips: "Legend content announced as the group label." }, type: "ReactNode", default: "--" },
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: "--" }
    ]
}

export default data
