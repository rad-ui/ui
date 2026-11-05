const data = {
    name: "Chips",
    description: "The selected values of a multiple Combobox as removable chips. Place it next to the trigger; Backspace in an empty search removes the last chip.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "children", info_tooltips: "Custom chip rendering: receives { value, label, remove }." }, type: "(chip) => ReactNode", default: "--" },
        { prop: { name: "getRemoveLabel", info_tooltips: "Accessible label for each remove button." }, type: "(label: string) => string", default: "label => `Remove ${label}`" }
    ]
}

export default data
