const data = {
    name: "Button",
    description: "An action button inside the toolbar. Must be rendered within Toolbar.Root.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "aria-label", info_tooltips: "Accessible name. Required when the button shows only an icon." }, type: "string", default: "--" },
        { prop: { name: "className", info_tooltips: "Class name applied to the button." }, type: "string", default: "--" },
        { prop: { name: "asChild", info_tooltips: "Merges props onto the single child element." }, type: "boolean", default: "false" },
        { prop: { name: "disabled", info_tooltips: "Disables the button." }, type: "boolean", default: "false" }
    ]
}

export default data
