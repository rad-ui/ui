const data = {
    name: "mergeProps",
    description: "Merges props objects. Later ones win, except classNames join, styles merge and event handlers chain: the rightmost runs first, and calling event.preventDefault() skips the ones to its left.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "...props", info_tooltips: "Props objects to merge." }, type: "object[]", default: "--" }
    ]
}

export default data
