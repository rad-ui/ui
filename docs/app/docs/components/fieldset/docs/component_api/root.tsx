const data = {
    name: "Root",
    description: "The native fieldset element used to group related form controls.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "customRootClass", info_tooltips: "Override the generated root class namespace." }, type: "string", default: '""' },
        { prop: { name: "disabled", info_tooltips: "Disables controls inside the fieldset using native browser behavior." }, type: "boolean", default: "false" },
        { prop: { name: "invalid", info_tooltips: "Marks the group as invalid and adds data-invalid plus aria-invalid." }, type: "boolean", default: "false" },
        { prop: { name: "name", info_tooltips: "Native fieldset name." }, type: "string", default: "--" },
        { prop: { name: "form", info_tooltips: "Associates the fieldset with a form by id." }, type: "string", default: "--" },
        { prop: { name: "color", info_tooltips: "Adds a data-color styling hook." }, type: "string", default: '""' },
        { prop: { name: "size", info_tooltips: "Adds a data-size styling hook." }, type: "string", default: '""' },
        { prop: { name: "variant", info_tooltips: "Adds a data-variant styling hook." }, type: "string", default: '""' }
    ]
}

export default data
