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
        { prop: { name: "defaultValue", info_tooltips: "Initial value (uncontrolled). Empty when omitted." }, type: "number | ''", default: "''" },
        { prop: { name: "min", info_tooltips: "Minimum allowed value." }, type: "number", default: "--" },
        { prop: { name: "max", info_tooltips: "Maximum allowed value." }, type: "number", default: "--" },
        { prop: { name: "step", info_tooltips: "Amount to increment/decrement per step. Decimal steps are rounded to the step's precision." }, type: "number", default: "1" },
        { prop: { name: "largeStep", info_tooltips: "Amount used by Shift+Arrow and PageUp/PageDown." }, type: "number", default: "step * 10" },
        { prop: { name: "name", info_tooltips: "Form field name forwarded to the input." }, type: "string", default: "--" },
        { prop: { name: "readOnly", info_tooltips: "Prevents editing and stepping while keeping the value focusable." }, type: "boolean", default: "false" },
        { prop: { name: "required", info_tooltips: "Marks the input as required for form validation." }, type: "boolean", default: "false" },
        { prop: { name: "disabled", info_tooltips: "Disables the field." }, type: "boolean", default: "false" },
        { prop: { name: "onValueChange", info_tooltips: "Callback when value changes. Typed values are clamped to min/max on blur or Enter." }, type: "(value: number | '') => void", default: "--" }
    ]
}

export default data
