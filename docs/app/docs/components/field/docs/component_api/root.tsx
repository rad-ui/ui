const data = {
    name: "Root",
    description: "Holds the field's state and links its parts. Renders a div.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "invalid", info_tooltips: "Marks the field invalid: the control gets aria-invalid and Field.Error renders." }, type: "boolean", default: "false" },
        { prop: { name: "disabled", info_tooltips: "Disables the control and adds data-disabled to every part." }, type: "boolean", default: "false" },
        { prop: { name: "required", info_tooltips: "Marks the control required." }, type: "boolean", default: "false" },
        { prop: { name: "name", info_tooltips: "Form field name, passed to the control." }, type: "string", default: "--" },
        { prop: { name: "asChild", info_tooltips: "Render the child element instead of a div." }, type: "boolean", default: "false" },
        { prop: { name: "customRootClass", info_tooltips: "Override the generated root class namespace." }, type: "string", default: '""' }
    ]
}

export default data
