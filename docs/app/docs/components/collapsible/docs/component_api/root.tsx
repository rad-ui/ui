const data = {
    name: "Root",
    description: "The root collapsible container.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "open", info_tooltips: "Controlled open state." }, type: "boolean", default: "false" },
        { prop: { name: "defaultOpen", info_tooltips: "Initial open state (uncontrolled)." }, type: "boolean", default: "false" },
        { prop: { name: "disabled", info_tooltips: "Prevents toggling." }, type: "boolean", default: "false" },
        { prop: { name: "transitionDuration", info_tooltips: "Transition duration in ms for open/close animation." }, type: "number", default: "0" },
        { prop: { name: "onOpenChange", info_tooltips: "Callback when open state changes." }, type: "function", default: "--" },
        { prop: { name: "customRootClass", info_tooltips: "Override the root CSS class." }, type: "string", default: '""' }
    ]
}

export default data
