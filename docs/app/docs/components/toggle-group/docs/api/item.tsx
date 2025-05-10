const data = {
    name: "Item",
    description: "Item component for the ToggleGroup component.",
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
                info_tooltips: "The children of the component."
            },
            type: "React.ReactNode",
            default: "null",
        },
        {
            prop: {
                name: "value",
                info_tooltips: "The value of the toggle item."
            },
            type: "string",
            default: "null",
        }
    ]
};

export default data; 