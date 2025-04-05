const data = {
    name: "Callout",
    description: "A component used to display important messages, notifications, or contextual information to the user.",
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
                info_tooltips: "The content to be displayed inside the callout."
            },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: {
                name: "className",
                info_tooltips: "Additional CSS class names to apply to the callout."
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
            default: "--",
        },
        {
            prop: {
                name: "color",
                info_tooltips: "Accent color to apply to the callout."
            },
            type: "string",
            default: "--",
        },
        {
            prop: {
                name: "variant",
                info_tooltips: "Style variant of the callout."
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "size",
                info_tooltips: "Size variant of the callout."
            },
            type: "string",
            default: "''",
        }
    ]
};

export default data; 