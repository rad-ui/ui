const data = {
    name: "Root",
    description: "The root Steps component.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value", info_tooltips: "Controlled index of the active step (0-based). Items with a lower value are marked completed." }, type: "number", default: "--" },
        { prop: { name: "defaultValue", info_tooltips: "Initial active step index when uncontrolled." }, type: "number", default: "0" },
        { prop: { name: "onValueChange", info_tooltips: "Called when the active step changes." }, type: "(value: number) => void", default: "--" },
        { prop: { name: "orientation", info_tooltips: "Layout direction of the steps. Exposed as data-orientation on the root." }, type: "enum", enum_values: ["horizontal", "vertical"], default: "vertical" },
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: '""' }
    ]
}

export default data
