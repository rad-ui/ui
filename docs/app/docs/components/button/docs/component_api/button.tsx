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
        },
        {
            prop: {
                name: "focusableWhenDisabled",
                info_tooltips: "Keep a disabled button in the tab order with aria-disabled, so focus isn't lost when it disables itself during a request and keyboard users can still reach it. It still won't activate."
            },
            type: "boolean",
            default: "false",
        },
        {
            prop: {
                name: "asChild",
                info_tooltips: "Render your own element (for example a link) with the button's styles and behaviour instead of a <button>."
            },
            type: "boolean",
            default: "false",
        },
        {
            prop: {
                name: "label",
                info_tooltips: "Sets aria-label, for buttons whose content doesn't name them (icon-only buttons)."
            },
            type: "string",
            default: "--",
        },
        {
            prop: {
                name: "description",
                info_tooltips: "Sets aria-description, extra context read after the button's name."
            },
            type: "string",
            default: "--",
        }
    ]
};

export const dataAttributes = {
    columns: [
        { name: "Attribute", id: "attribute" },
        { name: "Values", id: "values" }
    ],
    data: [
        { id: "data-variant", attribute: "data-variant", values: "The variant prop, when set" },
        { id: "data-size", attribute: "data-size", values: "The size prop, when set" },
        { id: "data-color", attribute: "data-color", values: "The color prop, when set" },
        { id: "data-disabled", attribute: "data-disabled", values: "Present when disabled" }
    ]
};

export default data; 