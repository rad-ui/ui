const data = {
    name: "Indicator",
    description: "Indicator component for the Progress component.",
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
        }
    ]
};

export default data; 