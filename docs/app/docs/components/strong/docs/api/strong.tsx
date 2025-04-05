const data = {
    name: "Strong",
    description: "A component for semantically marking text as important by rendering it as a <strong> element with bold styling.",
    columns: [
        {
            name: "Prop",
            id: "prop",
        },
        {
            name: "Type",
            id: "type",
        },
        {
            name: "Default",
            id: "default",
        }
    ],
    data: [
        {
            prop: {
                name: "children",
                info_tooltips: "The text content to be displayed with strong importance."
            },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: {
                name: "className",
                info_tooltips: "Additional CSS class names to apply to the strong element."
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "customRootClass",
                info_tooltips: "Custom root class name to override default styling."
            },
            type: "string",
            default: "''",
        }
    ]
};

export default data; 