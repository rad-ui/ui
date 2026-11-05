const data = {
    name: "Trigger",
    description: "Opens the select and displays the selected value.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "children", info_tooltips: "Placeholder shown when no value is selected." }, type: "ReactNode", default: "--" },
        { prop: { name: "renderValue", info_tooltips: "Renders the selected value and resolved label. Return null or undefined to use the default display." }, type: "(value: string, label: string) => ReactNode", default: "--" }
    ]
}

export default data
