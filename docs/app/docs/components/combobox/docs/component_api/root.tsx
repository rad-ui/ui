const data = {
    name: "Root",
    description: "The root Combobox component.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "multiple", info_tooltips: "Allow several selected values. value, defaultValue and onValueChange use arrays, and picking an option toggles it and keeps the list open." }, type: "boolean", default: "false" },
        { prop: { name: "value", info_tooltips: "Controlled selected value, or an array of values with multiple." }, type: "string | string[]", default: "--" },
        { prop: { name: "defaultValue", info_tooltips: "Initial selected value (uncontrolled), or an array with multiple." }, type: "string | string[]", default: "--" },
        { prop: { name: "open", info_tooltips: "Controlled open state." }, type: "boolean", default: "--" },
        { prop: { name: "disabled", info_tooltips: "Disables the combobox." }, type: "boolean", default: "false" },
        { prop: { name: "onValueChange", info_tooltips: "Callback when selection changes." }, type: "function", default: "--" },
        { prop: { name: "onOpenChange", info_tooltips: "Callback when open state changes." }, type: "function", default: "--" },
        { prop: { name: "items", info_tooltips: "Labels by value (or { value, label } pairs) so the trigger shows the selected label before the list mounts, even when items are rendered inside your own components." }, type: "Record<string, string> | { value: string; label: string }[]", default: "--" },
        { prop: { name: "onOpenChangeComplete", info_tooltips: "Called with true after the open animation finishes and with false after the close animation finishes (immediately when nothing animates)." }, type: "(open: boolean) => void", default: "--" }
    ]
}

export default data
