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
            type: "any",
            default: "null",
        },
        {
            prop: {
                name: "iconOnly",
                info_tooltips: "Square dimensions for icon-only items; omit when the item has visible text."
            },
            type: "boolean",
            default: "false",
        },
        {
            prop: {
                name: "className",
                info_tooltips: "Additional class names for the toggle item."
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "disabled",
                info_tooltips: "Disables this toggle item."
            },
            type: "boolean",
            default: "false",
        },
        {
            prop: {
                name: "asChild",
                info_tooltips: "Render the item as the child element."
            },
            type: "boolean",
            default: "false",
        }
    ]
};

export default data; 
