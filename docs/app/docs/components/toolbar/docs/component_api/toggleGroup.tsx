const data = {
    name: "ToggleGroup",
    description: "Groups toggle items so only one or many can be pressed at a time.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "type", info_tooltips: "Whether one or many items can be pressed simultaneously." }, type: '"single" | "multiple"', default: '"single"' },
        { prop: { name: "value", info_tooltips: "Controlled list of pressed item values." }, type: "any", default: "--" },
        { prop: { name: "defaultValue", info_tooltips: "Initial pressed values when uncontrolled." }, type: "any", default: "[]" },
        { prop: { name: "onValueChange", info_tooltips: "Called with the next pressed values." }, type: "(value: any) => void", default: "--" },
        { prop: { name: "disabled", info_tooltips: "Disables every toggle item in the group." }, type: "boolean", default: "false" }
    ]
}

export default data
