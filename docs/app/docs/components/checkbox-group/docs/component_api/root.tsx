const data = {
    name: "Root",
    description: "The root CheckboxGroup component.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value", info_tooltips: "Controlled array of checked values." }, type: "string[]", default: "[]" },
        { prop: { name: "defaultValue", info_tooltips: "Initial checked values (uncontrolled)." }, type: "string[]", default: "[]" },
        { prop: { name: "onValueChange", info_tooltips: "Callback when selection changes." }, type: "function", default: "--" }
    ]
}

export default data
