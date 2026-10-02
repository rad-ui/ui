const data = {
    name: "Arrow",
    description: "An optional pointer that tracks the trigger. Render it inside Content.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "className", info_tooltips: "Class name applied to the arrow element." }, type: "string", default: "--" },
        { prop: { name: "width", info_tooltips: "Arrow width in pixels." }, type: "number", default: "--" },
        { prop: { name: "height", info_tooltips: "Arrow height in pixels." }, type: "number", default: "--" }
    ]
}

export default data