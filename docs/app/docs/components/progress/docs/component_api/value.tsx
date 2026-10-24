const data = {
    name: "Value",
    description: "The current value as visible text: getValueLabel, then format, otherwise a rounded percentage. Hidden from screen readers, which hear the value from the root.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "children", info_tooltips: "Custom text from the formatted and raw value." }, type: "(formatted, value) => ReactNode", default: "--" }
    ]
}

export default data
