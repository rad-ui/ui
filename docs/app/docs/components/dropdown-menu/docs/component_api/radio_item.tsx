const data = {
    name: "RadioItem",
    description: "RadioItem: one choice in a RadioGroup.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value", info_tooltips: "The value it selects." }, type: "string", default: "--" },
        { prop: { name: "closeOnClick", info_tooltips: "Close the menu after selecting." }, type: "boolean", default: "false" }
    ]
}

export default data
