const data = {
    name: "Value",
    description: "An <output> showing the current value formatted with the root's formatValue; a range slider shows both values.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "children", info_tooltips: "Custom text from the formatted and raw values." }, type: "(formatted: string[], values: number[]) => ReactNode", default: "--" }
    ]
}

export default data
