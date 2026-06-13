const data = {
    name: "Theme",
    description: "A provider component that sets the visual context for all Rad UI components within it.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "appearance", info_tooltips: "Sets the color scheme. 'system' follows the OS preference." }, type: "enum", enum_values: ["light", "dark", "system"], default: "system" },
        { prop: { name: "accentColor", info_tooltips: "The accent color token applied to all child components." }, type: "string", default: '""' },
        { prop: { name: "radius", info_tooltips: "Border radius scale applied across components." }, type: "string", default: '""' },
        { prop: { name: "scaling", info_tooltips: "UI density / scaling factor applied across components." }, type: "string", default: '""' },
        { prop: { name: "id", info_tooltips: "The id attribute of the root div." }, type: "string", default: '"rad-ui-theme-container"' }
    ]
}

export default data
