const data = {
    name: "Root",
    description: "The root Select component.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value", info_tooltips: "Controlled selected value." }, type: "string", default: "--" },
        { prop: { name: "defaultValue", info_tooltips: "Initial selected value (uncontrolled)." }, type: "string", default: "--" },
        { prop: { name: "open", info_tooltips: "Controlled open state." }, type: "boolean", default: "--" },
        { prop: { name: "disabled", info_tooltips: "Disables the select." }, type: "boolean", default: "false" },
        { prop: { name: "onValueChange", info_tooltips: "Callback when selection changes." }, type: "function", default: "--" },
        { prop: { name: "onOpenChange", info_tooltips: "Callback when open state changes." }, type: "function", default: "--" }
    ]
}

export default data
