const data = {
    name: "Empty",
    description: "Shown when the typed text matches no option, such as \"No results\". It's outside the listbox and announced politely.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "children", info_tooltips: "The message." }, type: "ReactNode", default: "--" }
    ]
}

export default data
