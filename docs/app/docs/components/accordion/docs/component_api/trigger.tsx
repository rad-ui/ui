const data = {
    name : "Trigger",
    description : "The trigger component for the Accordion. This component is used to toggle the visibility of the AccordionItem.",
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
            info_tooltips : "The class name for the AccordionTrigger."
        },
        type : "string",
        default : "''",
       },
       {
        prop: {
            name : "asChild",
            info_tooltips: 'Whether to use the child component as the AccordionTrigger.'
        },
        type: 'boolean',
        default: 'false',
       }
    ]
}

export default data;