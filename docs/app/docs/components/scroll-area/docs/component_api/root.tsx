const data = {
    name: "Root",
    description: "The root ScrollArea container.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "type", info_tooltips: "Controls when the scrollbar is visible." }, type: "enum", enum_values: ["auto", "always", "scroll", "hover"], default: "hover" },
        { prop: { name: "customRootClass", info_tooltips: "Override the root CSS class." }, type: "string", default: '""' }
    ]
}

export default data
