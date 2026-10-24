const data = {
    name: "Root",
    description: "Holds the field's state and links its parts. Renders a div.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "invalid", info_tooltips: "Forces the field invalid, for example after a server error: the control gets aria-invalid and Field.Error renders." }, type: "boolean", default: "false" },
        { prop: { name: "validate", info_tooltips: "Custom validation, run after the browser's checks (required, type, pattern, min/max) pass. Return a message, several, or null." }, type: "(value: unknown) => string | string[] | null", default: "--" },
        { prop: { name: "validationMode", info_tooltips: "When results show: after a submit attempt (onSubmit), on blur, or on change. Once shown they update as the user types. Inside a Form, defaults to the Form's mode." }, type: "'onSubmit' | 'onBlur' | 'onChange'", default: "'onSubmit'" },
        { prop: { name: "disabled", info_tooltips: "Disables the control and adds data-disabled to every part." }, type: "boolean", default: "false" },
        { prop: { name: "required", info_tooltips: "Marks the control required." }, type: "boolean", default: "false" },
        { prop: { name: "name", info_tooltips: "Form field name, passed to the control." }, type: "string", default: "--" },
        { prop: { name: "asChild", info_tooltips: "Render the child element instead of a div." }, type: "boolean", default: "false" },
        { prop: { name: "customRootClass", info_tooltips: "Override the generated root class namespace." }, type: "string", default: '""' }
    ]
}

export default data
