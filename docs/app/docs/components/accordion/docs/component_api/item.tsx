const data = {
    name : "Item",
    description : "The item component for the Accordion.",
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
        },
    ],
    data:[
       {
        prop : {
            name : "className",
            info_tooltips : "The class name for the AccordionItem."
        },
        type : "string",
        default : "--",
       },
       {
        prop: {
            name : "asChild",
            info_tooltips: 'Whether to use the child component as the AccordionItem.'
        },
        type: 'boolean',
        default: 'false',
       },
       {
        prop: {
            name : "disabled",
            info_tooltips: 'Whether to disable the AccordionItem.'
        },
        type: 'boolean',
        default: 'false',
       },
       {
        prop: {
            name : "value*",
            info_tooltips: 'The value of the AccordionItem. This is used to identify the item in the Accordion.'
        },
        type: 'string',
        default: '--',
       }
    ]
}

export default data;