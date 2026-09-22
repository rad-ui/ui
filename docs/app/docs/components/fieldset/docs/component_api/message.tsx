const data = {
    name: "Message",
    description: "Optional helper or validation message for the grouped controls.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "invalid", info_tooltips: "Adds data-invalid and defaults the message role to alert." }, type: "boolean", default: "false" },
        { prop: { name: "role", info_tooltips: "Overrides the default role used for invalid messages." }, type: "string", default: "--" },
        { prop: { name: "children", info_tooltips: "Message content." }, type: "ReactNode", default: "--" }
    ]
}

export default data
