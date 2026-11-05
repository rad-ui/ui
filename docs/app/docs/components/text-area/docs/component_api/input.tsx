const data = {
    name: "Input",
    description: "The textarea input element.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "placeholder", info_tooltips: "Placeholder text shown when empty." }, type: "string", default: '""' },
        { prop: { name: "disabled", info_tooltips: "Disables the textarea." }, type: "boolean", default: "false" },
        { prop: { name: "readOnly", info_tooltips: "Makes the textarea read-only." }, type: "boolean", default: "false" },
        { prop: { name: "onValueChange", info_tooltips: "Called with the new text (and the change event) whenever it changes, after onChange." }, type: "(value: string, event) => void", default: "--" }
    ]
}

export default data
