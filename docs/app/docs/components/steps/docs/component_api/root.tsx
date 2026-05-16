const data = {
    name: "Root",
    description: "The root Steps component.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "currentStep", info_tooltips: "Index of the currently active step (0-based)." }, type: "number", default: "0" },
        { prop: { name: "orientation", info_tooltips: "Layout direction of the steps." }, type: "enum", enum_values: ["horizontal", "vertical"], default: "horizontal" },
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: '""' }
    ]
}

export default data
