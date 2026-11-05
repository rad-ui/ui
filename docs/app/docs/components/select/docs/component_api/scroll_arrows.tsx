const data = {
    name: "ScrollUpArrow / ScrollDownArrow",
    description: "Place them first and last inside Select.Content. Each shows only while the list can scroll that way, sticks to that edge, and scrolls the list while the pointer rests on it. Hidden from assistive technology.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "forceMount", info_tooltips: "Keep the arrow rendered (hidden) while the list can't scroll that way." }, type: "boolean", default: "false" },
        { prop: { name: "children", info_tooltips: "Replaces the default chevron." }, type: "ReactNode", default: "--" },
        { prop: { name: "asChild", info_tooltips: "Render your own element instead of the default div." }, type: "boolean", default: "false" }
    ]
}

export default data
