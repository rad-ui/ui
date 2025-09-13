const data = {
    name : "Root",
    description : "The root component for the Accordion.",
    columns : [
        {
            name : "Prop",
            id : "prop",
        },
        {
            name : "Type",
            id : "type",
        },
        {
            name: "Default",
            id : "default",
        }
    ],
    data:[
       {
        prop : {
            name : "className",
            info_tooltips : "The class name for the AccordionRoot."
        },
        type : "string",
        default : "''",
       },
       {
        prop : {
            name : "openMultiple",
            info_tooltips : "Whether to allow multiple items to be open at once."
        },
        type : "boolean",
        default : "false",
       },
       {
        prop: {
            name : "asChild",
            info_tooltips: 'Whether to use the child component as the Accordion.'
        },
        type: 'boolean',
        default: 'false',
       },
       {
        prop: {
            name : "loop",
            info_tooltips: 'Whether to loop through the Accordion items.'
        },
        type: 'boolean',
        default: 'true',
       },
       {
        prop: {
            name : "orientation",
            info_tooltips: 'The orientation of the Accordion.'
        },
        type: 'enum',
        enum_values : ['horizontal', 'vertical'],
        default: 'horizontal',
       },
       {
        prop: {
            name : "disableTabIndexing",
            info_tooltips: 'Disables the roving tabindex behavior for keyboard navigation.'
        },
        type: 'boolean',
        default: 'true',
       }
    ]
}

export default data;