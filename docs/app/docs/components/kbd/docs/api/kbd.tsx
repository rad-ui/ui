const data = {
    name: "Kbd",
    description: "A component that visually represents keyboard buttons or key combinations, often used in documentation to indicate keyboard shortcuts or commands.",
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
                info_tooltips: "The content to be displayed inside the keyboard key element."
            },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: {
                name: "className",
                info_tooltips: "Additional CSS class names to apply to the kbd element."
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
        },
        {
            prop: {
                name: "size",
                info_tooltips: "Size variant of the keyboard key."
            },
            type: "string",
            default: "''",
        }
    ]
};

export default data; 