const data = {
    name: "Root",
    description: "The root HoverCard component.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "open", info_tooltips: "Controlled open state." }, type: "boolean", default: "--" },
        { prop: { name: "defaultOpen", info_tooltips: "Initial open state (uncontrolled)." }, type: "boolean", default: "false" },
        { prop: { name: "openDelay", info_tooltips: "Delay in ms before opening." }, type: "number", default: "700" },
        { prop: { name: "closeDelay", info_tooltips: "Delay in ms before closing." }, type: "number", default: "300" },
        { prop: { name: "onOpenChange", info_tooltips: "Callback when open state changes." }, type: "function", default: "--" }
    ]
}

export default data
