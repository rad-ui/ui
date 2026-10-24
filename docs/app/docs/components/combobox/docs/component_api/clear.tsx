const data = {
    name: "Clear",
    description: "A button that clears the selection and the typed text, then returns focus to the input. It renders nothing while there's nothing to clear.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "forceMount", info_tooltips: "Keep the button rendered (disabled) while there's nothing to clear." }, type: "boolean", default: "false" },
        { prop: { name: "children", info_tooltips: "The button content." }, type: "ReactNode", default: "×" },
        { prop: { name: "aria-label", info_tooltips: "Accessible name; override it for other languages." }, type: "string", default: "\"Clear\"" },
        { prop: { name: "asChild", info_tooltips: "Render your own element instead of the default button." }, type: "boolean", default: "false" }
    ]
}

export default data
