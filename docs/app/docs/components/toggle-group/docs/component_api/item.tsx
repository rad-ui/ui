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
        },
        {
            prop: {
                name: "iconOnly",
                info_tooltips: "Square dimensions for icon-only items; omit when the item has visible text."
            },
            type: "boolean",
            default: "false",
        }
    ]
};

export default data; 