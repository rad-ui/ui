const data = {
    name: "GroupLabel",
    description: "A heading inside a Group. The group gets role=\"group\" and is named by it.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "children", info_tooltips: "Label text." }, type: "ReactNode", default: "--" }
    ]
}

export default data
