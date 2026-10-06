const data = {
    name: "Anchor",
    description: "Positions the popover against a specific element instead of the trigger.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "className", info_tooltips: "Class name applied to the anchor element." }, type: "string", default: "--" },
        { prop: { name: "children", info_tooltips: "The element the popover is positioned against." }, type: "ReactNode", default: "--" }
    ]
}

export default data