const data = {
    name: "Heading",
    description: "A component for displaying headings with different levels (h1-h6) and customizable styling.",
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
                name: "as",
                info_tooltips: "The HTML heading element to render."
            },
            type: "enum",
            enum_values: ["h1", "h2", "h3", "h4", "h5", "h6"],
            default: "h1",
        },
        {
            prop: {
                name: "children",
                info_tooltips: "The content of the heading."
            },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: {
                name: "className",
                info_tooltips: "Additional CSS class names to apply to the heading element."
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