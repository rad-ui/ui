const data = {
    name: "Root",
    description: "The root Menubar container.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value", info_tooltips: "Controlled open menu value." }, type: "string", default: "--" },
        { prop: { name: "onValueChange", info_tooltips: "Callback when the active menu changes." }, type: "function", default: "--" },
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: '""' }
    ]
}

export default data
