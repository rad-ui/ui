const data = {
    name: "Root",
    description: "The wrapper element that owns the input, slots and reset state.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "customRootClass", info_tooltips: "Override the generated root class namespace." }, type: "string", default: '""' },
        { prop: { name: "className", info_tooltips: "Class name applied to the wrapper element." }, type: "string", default: "--" }
    ]
}

export default data
