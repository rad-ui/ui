const data = {
    name: "Code",
    description: "A component for displaying inline code snippets using the semantic <code> HTML element.",
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
                info_tooltips: "The code content to display."
            },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: {
                name: "customRootClass",
                info_tooltips: "Custom root class name to override default styling."
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "variant",
                info_tooltips: "Style variant of the code element."
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "size",
                info_tooltips: "Size variant of the code element."
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "color",
                info_tooltips: "Accent color for the code element."
            },
            type: "string",
            default: "''",
        }
    ]
};

export default data; 