const data = {
    name: "Trigger",
    description: "Wraps the element (usually a link) that opens the card on hover or focus.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "asChild", info_tooltips: "Render your own element instead of the default span." }, type: "boolean", default: "false" },
        { prop: { name: "handle", info_tooltips: "Open the shared card connected to this handle, even outside its Root. The Root's openDelay and closeDelay still apply." }, type: "Handle", default: "--" },
        { prop: { name: "payload", info_tooltips: "With handle, data passed to the Root's children function, such as the user this link points to." }, type: "unknown", default: "--" }
    ]
}

export default data
