const data = {
    name: "Item",
    description: "A suggestion. Its value is the text filled in when picked.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value", info_tooltips: "The text to fill in." }, type: "string", default: "--" },
        { prop: { name: "disabled", info_tooltips: "Skip this suggestion." }, type: "boolean", default: "false" }
    ]
}

export default data
