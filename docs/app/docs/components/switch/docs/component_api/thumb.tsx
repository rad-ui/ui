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
                name: "className",
                info_tooltips: "Additional class names for the switch thumb."
            },
            type: "string",
            default: "--",
        },
        {
            prop: {
                name: "children",
                info_tooltips: "Optional thumb contents."
            },
            type: "ReactNode",
            default: "--",
        }
    ]
};

export default data; 
