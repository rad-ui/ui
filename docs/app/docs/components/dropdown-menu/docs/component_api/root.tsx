const data = {
    name: "Root",
    description: "The root DropdownMenu component.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "open", info_tooltips: "Controlled open state." }, type: "boolean", default: "--" },
        { prop: { name: "defaultOpen", info_tooltips: "Initial open state (uncontrolled)." }, type: "boolean", default: "false" },
        { prop: { name: "modal", info_tooltips: "Whether the menu is modal." }, type: "boolean", default: "true" },
        { prop: { name: "onOpenChange", info_tooltips: "Callback when open state changes." }, type: "function", default: "--" },
        { prop: { name: "openOnHover", info_tooltips: "Also open while the pointer rests on the trigger. Clicking still toggles." }, type: "boolean", default: "false" },
        { prop: { name: "hoverOpenDelay", info_tooltips: "With openOnHover, ms before opening." }, type: "number", default: "100" },
        { prop: { name: "hoverCloseDelay", info_tooltips: "With openOnHover, ms after the pointer leaves before closing." }, type: "number", default: "0" }
    ]
}

export default data
