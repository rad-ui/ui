const data = {
    name: "CheckboxItem",
    description: "CheckboxItem: a menu item that toggles, like \"Show grid\". It keeps the menu open unless closeOnClick is set.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "checked", info_tooltips: "Controlled checked state." }, type: "boolean", default: "--" },
        { prop: { name: "defaultChecked", info_tooltips: "Initial checked state." }, type: "boolean", default: "false" },
        { prop: { name: "onCheckedChange", info_tooltips: "Called with the new checked state." }, type: "(checked: boolean) => void", default: "--" },
        { prop: { name: "closeOnClick", info_tooltips: "Close the menu after toggling." }, type: "boolean", default: "false" }
    ]
}

export default data
