const data = {
    name: "Trigger",
    description: "One checkbox in the group. With parent, it's the \"select all\" checkbox: checked when every item is, mixed (aria-checked=\"mixed\", data-state=\"indeterminate\") when some are.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value", info_tooltips: "This item's value." }, type: "string", default: "--" },
        { prop: { name: "parent", info_tooltips: "Make this the select-all checkbox for the root's allValues." }, type: "boolean", default: "false" },
        { prop: { name: "disabled", info_tooltips: "Disable this checkbox." }, type: "boolean", default: "false" },
        { prop: { name: "onCheckedChange", info_tooltips: "Called with this item's new checked state." }, type: "(checked: boolean) => void", default: "--" }
    ]
}

export default data
