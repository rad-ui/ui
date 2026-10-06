const data = {
    name: "Root",
    description: "The root Tree component.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "aria-label", info_tooltips: "Accessible label for the tree when no visible label is present." }, type: "string", default: "--" },
        { prop: { name: "aria-labelledby", info_tooltips: "ID of an element that labels the tree." }, type: "string", default: "--" },
        { prop: { name: "loop", info_tooltips: "Whether arrow key navigation wraps from the last visible item to the first, and from the first to the last." }, type: "boolean", default: "true" }
    ]
}

export default data
