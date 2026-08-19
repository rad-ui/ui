const data = {
    name: "Label",
    description: "Associates text with form controls for accessibility.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        {
            prop: {
                name: "htmlFor",
                info_tooltips: "ID of the form element this label describes",
            },
            type: "string",
            default: "undefined",
        },
        {
            prop: {
                name: "children",
                info_tooltips: "The label content",
            },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: {
                name: "className",
                info_tooltips: "Additional CSS class names to apply",
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "customRootClass",
                info_tooltips: "Custom root class name to override default styling",
            },
            type: "string",
            default: "''",
        }
    ]
};

export default data;
