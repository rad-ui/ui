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
        },
        {
            prop: {
                name: "className",
                info_tooltips: "Additional class names for the progress indicator."
            },
            type: "string",
            default: "--",
        },
        {
            prop: {
                name: "style",
                info_tooltips: "Inline styles merged with the computed translateX transform."
            },
            type: "CSSProperties",
            default: "--",
        }
    ]
};

export default data; 
