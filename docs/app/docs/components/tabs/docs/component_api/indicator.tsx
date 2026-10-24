const data = {
    name: "Indicator",
    description: "A marker for the active tab, rendered inside Tabs.List. It sets --active-tab-left, --active-tab-top, --active-tab-right, --active-tab-bottom, --active-tab-width and --active-tab-height relative to the list, and data-activation-direction (left, right, up, down), so CSS can slide it between tabs.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "className", info_tooltips: "Classes for the indicator." }, type: "string", default: "--" },
        { prop: { name: "asChild", info_tooltips: "Render the child element instead of a span." }, type: "boolean", default: "false" }
    ]
}

export default data
