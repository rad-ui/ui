const data = {
    name: "Text",
    description: "A component for displaying text content with customizable styling.",
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
                info_tooltips: "The HTML element to render the text as."
            },
            type: "enum",
            enum_values: ["p", "span", "div", "label"],
            default: "p",
        },
        {
            prop: {
                name: "children",
                info_tooltips: "The text content to display."
            },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: {
                name: "className",
                info_tooltips: "Additional CSS class names to apply to the text element."
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