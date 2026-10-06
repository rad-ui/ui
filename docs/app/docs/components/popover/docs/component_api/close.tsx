const data = {
    name: "Close",
    description: "Closes the popover and returns focus to the trigger.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "asChild", info_tooltips: "Merges props onto the single child element instead of rendering a button." }, type: "boolean", default: "false" },
        { prop: { name: "className", info_tooltips: "Class name applied to the close button." }, type: "string", default: "--" },
        { prop: { name: "children", info_tooltips: "The close button content." }, type: "ReactNode", default: "--" }
    ]
}

export default data