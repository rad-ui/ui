const data = {
    name: "Slot",
    description: "A decorative leading or trailing container. Clicking it forwards focus to the input.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "side", info_tooltips: "Which edge of the input the slot occupies." }, type: '"start" | "end"', default: "--" },
        { prop: { name: "className", info_tooltips: "Class name applied to the slot element." }, type: "string", default: "--" },
        { prop: { name: "children", info_tooltips: "The slot content, typically an icon." }, type: "ReactNode", default: "--" }
    ]
}

export default data
