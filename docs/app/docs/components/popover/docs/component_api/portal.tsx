const data = {
    name: "Portal",
    description: "Renders the popover content into a portal so it escapes the trigger's overflow and stacking context.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "children", info_tooltips: "The popover content rendered inside the portal." }, type: "ReactNode", default: "--" },
        { prop: { name: "container", info_tooltips: "Custom DOM node used as the portal mount point." }, type: "Element | null", default: "--" },
        { prop: { name: "forceMount", info_tooltips: "Keeps the portal mounted even before the popover has opened once." }, type: "boolean", default: "false" }
    ]
}

export default data