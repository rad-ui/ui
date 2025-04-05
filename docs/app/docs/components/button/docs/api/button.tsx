const data = {
    name: "Button",
    description: "An interactive component used to trigger an action or event, such as submitting a form, opening a dialog, or performing a delete operation.",
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
        },
        {
            name: "",
            id: "info_tooltips",
        }
    ],
    data: [
        {
            prop: {
                name: "children",
                info_tooltips: "The content to be displayed inside the button."
            },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: {
                name: "type",
                info_tooltips: "The type of the button HTML element."
            },
            type: "enum",
            enum_values: ["button", "submit", "reset"],
            default: "'button'",
        },
        {
            prop: {
                name: "className",
                info_tooltips: "Additional CSS class names to apply to the button."
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
                name: "variant",
                info_tooltips: "Style variant of the button (solid, soft, outline, ghost)."
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "size",
                info_tooltips: "Size variant of the button (small, medium, large)."
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "color",
                info_tooltips: "Color theme of the button."
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "disabled",
                info_tooltips: "Whether the button is disabled."
            },
            type: "boolean",
            default: "false",
        }
    ]
};

export default data; 