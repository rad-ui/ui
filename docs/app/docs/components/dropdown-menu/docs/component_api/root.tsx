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
        { prop: { name: "onOpenChange", info_tooltips: "Callback when open state changes." }, type: "function", default: "--" },
        { prop: { name: "openOnHover", info_tooltips: "Also open while the pointer rests on the trigger. Clicking still toggles." }, type: "boolean", default: "false" },
        { prop: { name: "hoverOpenDelay", info_tooltips: "With openOnHover, ms before opening." }, type: "number", default: "100" },
        { prop: { name: "hoverCloseDelay", info_tooltips: "With openOnHover, ms after the pointer leaves before closing." }, type: "number", default: "0" },
        { prop: { name: "handle", info_tooltips: "Connects detached triggers made with DropdownMenu.createHandle(); children can be a function of the opening trigger's payload." }, type: "Handle", default: "--" },
        { prop: { name: "modal", info_tooltips: "While open, an outside press only closes the menu, page scroll is locked and the rest of the page is hidden from assistive technology." }, type: "boolean", default: "false" },
        { prop: { name: "side", info_tooltips: "Preferred side of the trigger. Flips when there isn't room. Overrides placement." }, type: '"top" | "right" | "bottom" | "left"', default: "--" },
        { prop: { name: "align", info_tooltips: "Alignment against the trigger. Overrides placement." }, type: '"start" | "center" | "end"', default: '"start"' },
        { prop: { name: "sideOffset", info_tooltips: "Distance from the trigger in px." }, type: "number", default: "4" },
        { prop: { name: "alignOffset", info_tooltips: "Shift along the cross axis in px." }, type: "number", default: "0" },
        { prop: { name: "onOpenChangeComplete", info_tooltips: "Called with true after the open animation finishes and with false after the close animation finishes (immediately when nothing animates)." }, type: "(open: boolean) => void", default: "--" }
    ]
}

export default data
