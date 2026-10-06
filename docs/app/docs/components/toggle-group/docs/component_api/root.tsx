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
                info_tooltips: "Controlled active values. Always an array, in both single and multiple mode (single mode holds at most one entry, e.g. ['bold']). A bare string is accepted and treated as a one-item array."
            },
            type: "string[]",
            default: "--",
        },
        {
            prop: {
                name: "defaultValue",
                info_tooltips: "Initial active values for uncontrolled usage. Always an array, in both modes (e.g. ['bold']). A bare string is accepted and treated as a one-item array."
            },
            type: "string[]",
            default: "[]",
        },
        {
            prop: {
                name: "onValueChange",
                info_tooltips: "Called with the new array of active values, in both single and multiple mode. In single mode the array has one entry, or is empty when the pressed item is toggled off."
            },
            type: "(value: string[]) => void",
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
                info_tooltips: "Merge the root's props and behavior onto its single child element instead of rendering a wrapper div."
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
