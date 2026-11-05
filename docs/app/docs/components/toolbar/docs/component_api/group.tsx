const data = {
    name: "Group",
    description: "Groups related items; name it with aria-label. Arrow keys still move across the whole toolbar.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "disabled", info_tooltips: "Disables every button, link, input and toggle item inside the group. An item's own disabled prop still wins." }, type: "boolean", default: "false" },
        { prop: { name: "asChild", info_tooltips: "Render your own element instead of the default div." }, type: "boolean", default: "false" }
    ]
}

export default data
