const data = {
    name: "Trigger",
    description: "The button that opens the list. Its children are the placeholder; once an item is selected it shows that item's label instead, or whatever `renderValue` returns.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "renderValue", info_tooltips: "Custom content for the selected value, called with the value and the item's label. Use it to show something shorter than the item, or add an icon or swatch." }, type: "(value: string, label: string) => ReactNode", default: "--" },
        { prop: { name: "placeholder", info_tooltips: "Marks the trigger as showing placeholder content (sets data-placeholder for styling)." }, type: "boolean", default: "false" },
        { prop: { name: "disabled", info_tooltips: "Disables the trigger." }, type: "boolean", default: "false" },
        { prop: { name: "asChild", info_tooltips: "Render the trigger as its child element instead of a button." }, type: "boolean", default: "false" },
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: '""' }
    ]
}

export default data
