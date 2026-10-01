const data = {
    name: "ToggleItem",
    description: "A pressable item inside a ToggleGroup. Must be rendered within Toolbar.ToggleGroup.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value", info_tooltips: "The value this item contributes to the group's value when pressed." }, type: "any", default: "required" },
        { prop: { name: "aria-label", info_tooltips: "Accessible name. Required when the item shows only an icon." }, type: "string", default: "--" },
        { prop: { name: "disabled", info_tooltips: "Disables this item." }, type: "boolean", default: "false" },
        { prop: { name: "className", info_tooltips: "Class name applied to the toggle item." }, type: "string", default: "--" }
    ]
}

export default data
