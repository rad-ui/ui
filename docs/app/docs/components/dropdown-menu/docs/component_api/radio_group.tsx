const data = {
    name: "RadioGroup",
    description: "RadioGroup: groups radio items so one is checked.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value", info_tooltips: "Controlled value." }, type: "string", default: "--" },
        { prop: { name: "defaultValue", info_tooltips: "Initial value." }, type: "string", default: "\"\"" },
        { prop: { name: "onValueChange", info_tooltips: "Called with the new value." }, type: "(value: string) => void", default: "--" },
        { prop: { name: "disabled", info_tooltips: "Disable every item." }, type: "boolean", default: "false" }
    ]
}

export default data
