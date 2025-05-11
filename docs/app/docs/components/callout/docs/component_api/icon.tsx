export const data = {
    name : "Icon",
    description : "The icon component for the Callout. This component is used to display the icon content of the Callout.",
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
            info_tooltips : "The content of the CalloutIcon."
        },
        type : "ReactNode",
        default : "--",
       },
       {
        prop: {
            name : "className",
            info_tooltips: 'The class name for the CalloutIcon.'
        },
        type: 'string',
        default: '--',
       }
    ]
}