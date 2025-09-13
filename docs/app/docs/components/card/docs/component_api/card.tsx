const data = {
    name: "Card",
    description: "A container component that groups related content and actions with consistent styling.",
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
                info_tooltips: "The content to be displayed inside the card."
            },
            type: "ReactNode",
            default: "''",
        },
        {
            prop: {
                name: "className",
                info_tooltips: "Additional CSS class names to apply to the card."
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
                name: "data-accent-color",
                info_tooltips: "Accent color to apply to the card. Used as a data attribute."
            },
            type: "string",
            default: "''",
        }
    ]
};

export default data; 