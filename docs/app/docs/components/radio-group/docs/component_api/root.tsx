const data = {
    name: "Root",
    description: "The root RadioGroup component.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "name", info_tooltips: "The name attribute shared across all radio items." }, type: "string", default: "--" },
        { prop: { name: "value", info_tooltips: "Controlled selected value." }, type: "string", default: "--" },
        { prop: { name: "defaultValue", info_tooltips: "Initial selected value (uncontrolled)." }, type: "string", default: "--" },
        { prop: { name: "disabled", info_tooltips: "Disables all items in the group." }, type: "boolean", default: "false" },
        { prop: { name: "onValueChange", info_tooltips: "Callback when selection changes." }, type: "function", default: "--" }
    ]
}

export default data
