const data = {
    name: "Root",
    description: "Root component for the ToggleGroup component.",
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
                name: "type",
                info_tooltips: "The type of the toggle group."
            },
            type: 'enum',
            enum_values : ['single', 'multiple'],
            default: "single",
        },
        {
            prop: {
                name: "className",
                info_tooltips: "The class name of the toggle group."
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "loop",
                info_tooltips: "Whether the toggle group should loop."
            },
            type: "boolean",
            default: "true",
        },
        {
            prop: {
                name : "orientation",
                info_tooltips: 'The orientation of the toggle group.'
            },
            type: 'enum',
            enum_values : ['horizontal', 'vertical'],
            default: 'horizontal',
           },
        
        {
            prop: {
                name: "value",
                info_tooltips: "Controlled active value or values."
            },
            type: "any",
            default: "--",
        },
        {
            prop: {
                name: "defaultValue",
                info_tooltips: "Initial active value or values for uncontrolled usage."
            },
            type: "any",
            default: "[]",
        },
        {
            prop: {
                name: "onValueChange",
                info_tooltips: "Called when the active value set changes."
            },
            type: "function",
            default: "--",
        },
        {
            prop: {
                name: "color",
                info_tooltips: "The color of the toggle group."
            },
            type: "string",
            default: "null",
        },
        {
            prop: {
                name: "customRootClass",
                info_tooltips: "Custom class namespace used to swap the default toggle-group styles."
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "disabled",
                info_tooltips: "Disables the entire toggle group."
            },
            type: "boolean",
            default: "false",
        },
        {
            prop: {
                name: "dir",
                info_tooltips: "Text direction used by roving focus."
            },
            type: "enum",
            enum_values: ['ltr', 'rtl'],
            default: "ltr",
        },
        {
            prop: {
                name: "rovingFocus",
                info_tooltips: "Whether arrow-key focus management is enabled."
            },
            type: "boolean",
            default: "true",
        },
        {
            prop: {
                name: "asChild",
                info_tooltips: "Render the root as the child element."
            },
            type: "boolean",
            default: "false",
        },
        
        {
            prop: {
                name: "children",
                info_tooltips: "The children of the toggle group."
            },
            type: "React.ReactNode",
            default: "null",
        }
    ]
};

export default data; 
