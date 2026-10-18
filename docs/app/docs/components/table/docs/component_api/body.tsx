const data = {
    name : "Body",
    description : "The body component for the Table.",
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
            info_tooltips : "The class name for the Body."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "children",
            info_tooltips : "The children of the Body."
        },
        type : "ReactNode",
        default : "--",
       },
       {
        prop : {
            name : "asChild",
            info_tooltips : "Merges props onto the immediate child element instead of rendering the default tbody."
        },
        type : "boolean",
        default : "false",
       },
    ]
}

export default data;
