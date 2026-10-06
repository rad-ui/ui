const data = {
    name: "Input",
    description: "The native input element. Accepts every native input prop.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "type", info_tooltips: "Native input type." }, type: "string", default: '"text"' },
        { prop: { name: "className", info_tooltips: "Class name applied to the input element." }, type: "string", default: "--" },
        { prop: { name: "value", info_tooltips: "Controlled value. Drives the reset button's visibility." }, type: "string", default: "--" },
        { prop: { name: "defaultValue", info_tooltips: "Initial value when uncontrolled." }, type: "string", default: "--" },
        { prop: { name: "placeholder", info_tooltips: "Placeholder text. Not a substitute for a label." }, type: "string", default: "--" },
        { prop: { name: "disabled", info_tooltips: "Disables the input." }, type: "boolean", default: "false" },
        { prop: { name: "readOnly", info_tooltips: "Prevents editing without disabling the field." }, type: "boolean", default: "false" },
        { prop: { name: "aria-label", info_tooltips: "Accessible name when no visible label element is associated." }, type: "string", default: "--" }
    ]
}

export default data
