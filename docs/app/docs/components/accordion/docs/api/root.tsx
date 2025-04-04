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
        },
        {
            name : "",
            id : "info_tooltips",
        }
    ],
    data:[
       {
        prop : "className",
        type : "string",
        default : "--",
        info_tooltips : "The class name for the Accordion."
       },
       {
        prop : "openMultiple",
        type : "boolean",
        default : "false",
        info_tooltips : "Whether to allow multiple items to be open at once."
       },
       {
        prop: 'asChild',
        type: 'boolean',
        default: 'false',
        info_tooltips: 'Whether to use the child component as the Accordion.'
       },
       {
        prop: 'loop',
        type: 'boolean',
        default: 'true',
        info_tooltips: 'Whether to loop through the Accordion items.'
       },
       {
        prop:'orientation',
        type: 'enum',
        enum_values : ['horizontal', 'vertical'],
        default: 'horizontal',
        info_tooltips: 'The orientation of the Accordion.'
       }
    ]
}

export default data;