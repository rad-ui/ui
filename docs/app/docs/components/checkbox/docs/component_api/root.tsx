const data = {
    name: "Root",
    description: "The root checkbox element.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "checked", info_tooltips: "Controlled checked state." }, type: "boolean", default: "false" },
        { prop: { name: "defaultChecked", info_tooltips: "Initial checked state (uncontrolled)." }, type: "boolean", default: "false" },
        { prop: { name: "disabled", info_tooltips: "Disables the checkbox." }, type: "boolean", default: "false" },
        { prop: { name: "required", info_tooltips: "Marks the checkbox as required in a form." }, type: "boolean", default: "false" },
        { prop: { name: "onCheckedChange", info_tooltips: "Callback when checked state changes." }, type: "function", default: "--" },
        { prop: { name: "color", info_tooltips: "Accent color applied to the checkbox." }, type: "string", default: '""' },
        { prop: { name: "size", info_tooltips: "Size variant." }, type: "string", default: '""' },
        { prop: { name: "variant", info_tooltips: "Style variant." }, type: "string", default: '""' },
        { prop: { name: "customRootClass", info_tooltips: "Override the root CSS class." }, type: "string", default: '""' }
    ]
}

export default data
