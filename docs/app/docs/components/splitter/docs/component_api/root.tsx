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
        { prop: { name: "maxSizes", info_tooltips: "Maximum percentage size per panel. Splitter.Panel also accepts minSize/maxSize." }, type: "number[]", default: "--" },
        { prop: { name: "disabled", info_tooltips: "Disables resizing for every handle. Splitter.Handle also accepts disabled for a single handle." }, type: "boolean", default: "false" },
        { prop: { name: "dir", info_tooltips: "Reading direction. In RTL, horizontal arrow keys and drags are mirrored. Inherited from CSS when omitted." }, type: "enum", enum_values: ["ltr", "rtl"], default: "--" },
        { prop: { name: "onSizesChange", info_tooltips: "Called with the new sizes after a keyboard resize or when a drag ends." }, type: "function", default: "--" }
    ]
}

export default data
