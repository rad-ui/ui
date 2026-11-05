const data = {
    name: "Track",
    description: "The bar behind the Indicator. Optional; use it to place Label and Value beside the bar.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "className", info_tooltips: "Classes for the bar." }, type: "string", default: "--" }
    ]
}

export default data
