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
        { prop: { name: "openDelay", info_tooltips: "Delay in ms before opening." }, type: "number", default: "100" },
        { prop: { name: "closeDelay", info_tooltips: "Delay in ms before closing." }, type: "number", default: "200" },
        { prop: { name: "onOpenChange", info_tooltips: "Callback when open state changes." }, type: "function", default: "--" },
        { prop: { name: "handle", info_tooltips: "Connects detached triggers made with HoverCard.createHandle(); children can be a function of the hovered trigger's payload." }, type: "Handle", default: "--" },
        { prop: { name: "onOpenChangeComplete", info_tooltips: "Called with true after the open animation finishes and with false after the close animation finishes (immediately when nothing animates)." }, type: "(open: boolean) => void", default: "--" }
    ]
}

export default data
