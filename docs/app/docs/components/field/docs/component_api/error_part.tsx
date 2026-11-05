const data = {
    name: "Error",
    description: "The error message. Renders only while the field is invalid, is announced when it appears and is added to the control's accessible description after any help text. Without children it shows the validation message.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "match", info_tooltips: "Show this error only for one validity problem, such as valueMissing or typeMismatch, so each can have its own message. true always shows it." }, type: "boolean | keyof ValidityState", default: "--" },
        { prop: { name: "forceMount", info_tooltips: "Keep the element rendered, hidden, while the field is valid." }, type: "boolean", default: "false" },
        { prop: { name: "asChild", info_tooltips: "Render the child element instead of a p." }, type: "boolean", default: "false" }
    ]
}

export default data
