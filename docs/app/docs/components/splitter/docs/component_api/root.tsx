const data = {
    name: "Root",
    description: "The root Splitter component.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "orientation", info_tooltips: "Direction of the split." }, type: "enum", enum_values: ["horizontal", "vertical"], default: "horizontal" },
        { prop: { name: "defaultSizes", info_tooltips: "Initial percentage sizes for each panel." }, type: "number[]", default: "--" },
        { prop: { name: "minSizes", info_tooltips: "Minimum percentage size per panel." }, type: "number[]", default: "--" },
        { prop: { name: "onSizesChange", info_tooltips: "Callback when panel sizes change." }, type: "function", default: "--" }
    ]
}

export default data
