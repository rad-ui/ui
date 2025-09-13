const data = {
    name : "Root",
    description : "The root component for the Avatar.",
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
            info_tooltips : "The class name for the AvatarRoot."
        },
        type : "string",
        default : "''",
       },
       {
        prop : {
            name : "customRootClass",
            info_tooltips : "The class name for the AvatarRoot."
        },
        type : "string",
        default : "''",
       },
       {
        prop: {
            name : "asChild",
            info_tooltips: 'Whether to use the child component as the AvatarRoot.'
        },
        type: 'boolean',
        default: 'false',
       },
       {
        prop: {
            name : "children",
            info_tooltips: 'The children of the AvatarRoot.'
        },
        type: 'React.ReactNode',
        default: "''",
       },
       {
        prop: {
            name : "size",
            info_tooltips: 'The size of the AvatarRoot.'
        },
        type: 'string',
        default: "''",
       },
       {
        prop: {
            name : "variant",
            info_tooltips: 'The variant of the AvatarRoot.'
        },
        type: 'string',
        default: "''",
       },
       {
        prop: {
            name : "color",
            info_tooltips: 'The color of the AvatarRoot.'
        },
        type: 'string',
        default: "''",
       }
    ]
}

export default data;