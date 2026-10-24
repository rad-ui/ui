const data = {
    name: "Root",
    description: "Holds the input text and the suggestion list state.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value", info_tooltips: "Controlled input text." }, type: "string", default: "--" },
        { prop: { name: "defaultValue", info_tooltips: "Initial text when uncontrolled." }, type: "string", default: "\"\"" },
        { prop: { name: "onValueChange", info_tooltips: "Called with the text as the user types or picks a suggestion." }, type: "(value: string) => void", default: "--" },
        { prop: { name: "open", info_tooltips: "Controlled open state of the suggestions." }, type: "boolean", default: "--" },
        { prop: { name: "onOpenChange", info_tooltips: "Called when the suggestions open or close." }, type: "(open: boolean) => void", default: "--" },
        { prop: { name: "disabled", info_tooltips: "Disable the input." }, type: "boolean", default: "false" }
    ]
}

export default data
