const data = {
    name : "Text",
    description : "The text component for the Callout. This component is used to display the text content of the Callout.",
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
            info_tooltips : "The content of the CalloutText."
        },
        type : "ReactNode",
        default : "--",
       },
       {
        prop: {
            name : "className",
            info_tooltips: 'The class name for the CalloutText.'
        },
        type: 'string',
        default: '--',
       }
    ]
}

export default data;