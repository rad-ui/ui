const data = {
    name: "Label",
    description: "Renders a native <label> that names a form control, either through htmlFor or by wrapping the control.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "htmlFor", info_tooltips: "The id of the form control this label names." }, type: "string", default: "--" },
        { prop: { name: "asChild", info_tooltips: "Render the child element instead of a <label>, merging the label's props onto it." }, type: "boolean", default: "false" },
        { prop: { name: "customRootClass", info_tooltips: "Class namespace for the root class (e.g. \"acme\" gives acme-label)." }, type: "string", default: "''" },
        { prop: { name: "className", info_tooltips: "Additional CSS class names." }, type: "string", default: "''" }
    ]
};

export default data;
