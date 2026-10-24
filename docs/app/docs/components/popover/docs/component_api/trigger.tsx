const data = {
    name: "Trigger",
    description: "The button that toggles the popover open and closed.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "asChild", info_tooltips: "Merges props onto the single child element instead of rendering a button." }, type: "boolean", default: "false" },
        { prop: { name: "className", info_tooltips: "Class name applied to the trigger button." }, type: "string", default: "--" },
        { prop: { name: "children", info_tooltips: "The trigger content." }, type: "ReactNode", default: "--" },
        { prop: { name: "handle", info_tooltips: "Open the Root connected to this handle, from anywhere in the page." }, type: "Handle", default: "--" },
        { prop: { name: "payload", info_tooltips: "Data for the content, such as the row this trigger belongs to." }, type: "unknown", default: "--" }
    ]
}

export default data