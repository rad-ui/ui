const data = {
    name: "Root",
    description: "Root component for the Switch component.",
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
                name: "customRootClass",
                info_tooltips: "Custom root class name to override default styling."
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "color",
                info_tooltips: "Accent color token for the switch."
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "variant",
                info_tooltips: "Visual variant token for the switch."
            },
            type: "string",
            default: "--",
        },
        {
            prop: {
                name: "size",
                info_tooltips: "Visual size token for the switch."
            },
            type: "string",
            default: "--",
        },
        {
            prop: {
                name: "defaultChecked",
                info_tooltips: "Initial checked state for uncontrolled usage."
            },
            type: "boolean",
            default: "false",
        },
        {
            prop: {
                name: "checked",
                info_tooltips: "Controlled checked state."
            },
            type: "boolean",
            default: "--",
        },
        {
            prop: {
                name: "onCheckedChange",
                info_tooltips: "Called when the checked state changes."
            },
            type: "function",
            default: "--",
        },
        {
            prop: {
                name: "disabled",
                info_tooltips: "Disables the switch."
            },
            type: "boolean",
            default: "false",
        },
        {
            prop: {
                name: "required",
                info_tooltips: "Marks the switch as required in forms."
            },
            type: "boolean",
            default: "false",
        },
        {
            prop: {
                name: "name",
                info_tooltips: "Form field name."
            },
            type: "string",
            default: "--",
        },
        {
            prop: {
                name: "value",
                info_tooltips: "Form field value."
            },
            type: "string",
            default: "--",
        },
        {
            prop: {
                name: "asChild",
                info_tooltips: "Render the root as the child element."
            },
            type: "boolean",
            default: "false",
        }
    ]
};

export default data; 
