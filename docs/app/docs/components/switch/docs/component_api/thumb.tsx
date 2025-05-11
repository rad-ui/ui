const data = {
    name: "Thumb",
    description: "Thumb component for the Switch component.",
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
                name: "asChild",
                info_tooltips: "If true, the component will render its children as a child of the component."
            },
            type: "boolean",
            default: "false",
        },
        {
            prop: {
                name: "customThumbClass",
                info_tooltips: "Custom thumb class name to override default styling."
            },
            type: "string",
            default: "''",
        },
    ]
};

export default data; 

