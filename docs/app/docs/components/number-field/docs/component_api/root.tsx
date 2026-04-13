const data = {
    name: "Root",
    description: "The root NumberField component.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value", info_tooltips: "Controlled value." }, type: "number", default: "--" },
        { prop: { name: "defaultValue", info_tooltips: "Initial value (uncontrolled)." }, type: "number", default: "0" },
        { prop: { name: "min", info_tooltips: "Minimum allowed value." }, type: "number", default: "--" },
        { prop: { name: "max", info_tooltips: "Maximum allowed value." }, type: "number", default: "--" },
        { prop: { name: "step", info_tooltips: "Amount to increment/decrement per step." }, type: "number", default: "1" },
        { prop: { name: "disabled", info_tooltips: "Disables the field." }, type: "boolean", default: "false" },
        { prop: { name: "onValueChange", info_tooltips: "Callback when value changes." }, type: "function", default: "--" }
    ]
}

export default data
