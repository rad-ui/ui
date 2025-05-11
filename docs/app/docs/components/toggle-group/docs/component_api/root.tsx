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
                info_tooltips: "The value of the toggle group."
            },
            type: "string",
            default: "null",
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
                name: "children",
                info_tooltips: "The children of the toggle group."
            },
            type: "React.ReactNode",
            default: "null",
        }
    ]
};

export default data; 