const data = {
    name: "Value",
    description: "Inside Select.Trigger: shows the selected label or a placeholder, and lets the trigger keep its own children (icons, prefixes).",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "placeholder", info_tooltips: "Shown while nothing is selected; the element gets data-placeholder." }, type: "ReactNode", default: "--" },
        { prop: { name: "children", info_tooltips: "Custom display from the selected value and label." }, type: "(value, label) => ReactNode", default: "--" }
    ]
}

export default data
