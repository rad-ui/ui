const data = {
    name: "Reset",
    description: "Clears the input and returns focus to it. Renders hidden until the input has a value.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "className", info_tooltips: "Class name applied to the reset button." }, type: "string", default: "--" },
        { prop: { name: "children", info_tooltips: "The reset button content, typically an icon." }, type: "ReactNode", default: "--" },
        { prop: { name: "onClick", info_tooltips: "Called first. Call preventDefault to stop the clear." }, type: "(event) => void", default: "--" }
    ]
}

export default data
