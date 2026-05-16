const data = {
    name: "Item",
    description: "A single tree node. Can contain nested Tree.Item elements.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "label*", info_tooltips: "The label displayed for this tree node." }, type: "string | ReactNode", default: "--" },
        { prop: { name: "defaultOpen", info_tooltips: "Whether this node is expanded by default." }, type: "boolean", default: "false" },
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: '""' }
    ]
}

export default data
