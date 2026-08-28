const data = {
    name: "Root",
    description: "Root component for the Meter primitive.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        {
            prop: { name: "value", info_tooltips: "Current bounded meter value." },
            type: "number",
            default: "0"
        },
        {
            prop: { name: "minValue", info_tooltips: "Minimum value in the meter range." },
            type: "number",
            default: "0"
        },
        {
            prop: { name: "maxValue", info_tooltips: "Maximum value in the meter range." },
            type: "number",
            default: "100"
        },
        {
            prop: { name: "lowValue", info_tooltips: "Optional threshold for low values." },
            type: "number",
            default: "--"
        },
        {
            prop: { name: "highValue", info_tooltips: "Optional threshold for high values." },
            type: "number",
            default: "--"
        },
        {
            prop: { name: "optimumValue", info_tooltips: "Optional optimum value marker." },
            type: "number",
            default: "--"
        },
        {
            prop: { name: "getValueLabel", info_tooltips: "Formats aria-valuetext for assistive technologies." },
            type: "(value, minValue, maxValue) => string",
            default: "--"
        },
        {
            prop: { name: "asChild", info_tooltips: "Render the root attributes onto the child element." },
            type: "boolean",
            default: "false"
        },
        {
            prop: { name: "customRootClass", info_tooltips: "Custom root class name to override default styling." },
            type: "string",
            default: "--"
        }
    ]
};

export default data;
