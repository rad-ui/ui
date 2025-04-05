const data = {
    name: "Separator",
    description: "A component that visually separates content with a horizontal or vertical line, providing visual hierarchy and improved content organization.",
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
                name: "orientation",
                info_tooltips: "Determines whether the separator displays as a horizontal or vertical line."
            },
            type: "enum",
            enum_values: ["horizontal", "vertical"],
            default: "'horizontal'",
        },
        {
            prop: {
                name: "className",
                info_tooltips: "Additional CSS class names to apply to the separator."
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
                name: "color",
                info_tooltips: "Color theme of the separator line."
            },
            type: "string",
            default: "''",
        }
    ]
};

export default data; 