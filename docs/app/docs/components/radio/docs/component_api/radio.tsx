const data = {
    name: "Radio",
    description: "A single radio button input.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "name", info_tooltips: "The name attribute for the radio input group." }, type: "string", default: '""' },
        { prop: { name: "value", info_tooltips: "The value of this radio option." }, type: "string", default: '""' },
        { prop: { name: "id", info_tooltips: "The id attribute for label association." }, type: "string", default: '""' },
        { prop: { name: "checked", info_tooltips: "Whether the radio is checked." }, type: "boolean", default: "false" },
        { prop: { name: "disabled", info_tooltips: "Disables the radio input." }, type: "boolean", default: "false" },
        { prop: { name: "size", info_tooltips: "Size variant." }, type: "string", default: '""' },
        { prop: { name: "color", info_tooltips: "Accent color." }, type: "string", default: '""' },
        { prop: { name: "variant", info_tooltips: "Style variant." }, type: "string", default: '""' },
        { prop: { name: "onChange", info_tooltips: "Callback fired when the radio state changes." }, type: "function", default: "--" }
    ]
}

export default data
