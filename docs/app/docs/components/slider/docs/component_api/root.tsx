const data = {
    name: "Root",
    description: "The root Slider component.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value", info_tooltips: "Controlled value." }, type: "number | number[]", default: "--" },
        { prop: { name: "defaultValue", info_tooltips: "Initial value (uncontrolled)." }, type: "number | number[]", default: "--" },
        { prop: { name: "min", info_tooltips: "Minimum value." }, type: "number", default: "0" },
        { prop: { name: "max", info_tooltips: "Maximum value." }, type: "number", default: "100" },
        { prop: { name: "step", info_tooltips: "Step increment." }, type: "number", default: "1" },
        { prop: { name: "orientation", info_tooltips: "Slider orientation." }, type: "enum", enum_values: ["horizontal", "vertical"], default: "horizontal" },
        { prop: { name: "disabled", info_tooltips: "Disables the slider." }, type: "boolean", default: "false" },
        { prop: { name: "showStepMarks", info_tooltips: "Shows tick marks at each step." }, type: "boolean", default: "false" },
        { prop: { name: "formatValue", info_tooltips: "Custom formatter for displayed value." }, type: "function", default: "--" },
        { prop: { name: "onValueChange", info_tooltips: "Callback during drag." }, type: "function", default: "--" },
        { prop: { name: "onValueCommit", info_tooltips: "Callback when drag ends." }, type: "function", default: "--" }
    ]
}

export default data
