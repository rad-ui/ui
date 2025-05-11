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
            name : "children",
            info_tooltips : "The content of the CalloutRoot."
        },
        type : "ReactNode",
        default : "--",
       },
       {
        prop: {
            name : "asChild",
            info_tooltips: 'Whether to use the child component as the CalloutRoot.'
        },
        type: 'boolean',
        default: 'false',
       },
       {
        prop: {
            name : "className",
            info_tooltips: 'The class name for the CalloutRoot.'
        },
       },
       {
        prop: {
            name : "customRootClass",
            info_tooltips: 'The custom class name for the CalloutRoot.'
        },
        type: 'string',
        default: '--',
       },
       {
        prop: {
            name : "color",
            info_tooltips: 'The color of the CalloutRoot.'
        },
        type: 'string',
        default: '--',
       },
       {
        prop: {
            name : "variant",
            info_tooltips: 'The variant of the CalloutRoot.'
        },
        type: 'string',
        default: '--',
       },
       {
        prop: {
            name : "size",
            info_tooltips: 'The size of the CalloutRoot.'
        },
        type: 'string',
        default: '--',
       }
    ]
}

export default data;