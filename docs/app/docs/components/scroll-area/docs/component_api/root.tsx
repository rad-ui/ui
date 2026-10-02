const data = {
    name: "Root",
    description: "The root ScrollArea container.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "type", info_tooltips: "Controls when the scrollbar is visible." }, type: "enum", enum_values: ["auto", "always", "scroll", "hover"], default: "hover" },
        { prop: { name: "scrollRestoration", info_tooltips: "Use manual for full-page scroll containers that should reset their viewport on route changes." }, type: "enum", enum_values: ["auto", "manual"], default: "auto" },
        { prop: { name: "restoreKey", info_tooltips: "Key that triggers a manual scroll reset when it changes, such as a pathname." }, type: "React.Key", default: "undefined" },
        { prop: { name: "customRootClass", info_tooltips: "Override the root CSS class." }, type: "string", default: '""' }
    ]
}

export default data
