const data = {
    name : "Image",
    description : "The image component for the Avatar.",
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
            info_tooltips : "The children of the AvatarFallback."
        },
        type : "React.ReactNode",
        default : "--",
       },
       {
        prop : {
            name : "className",
            info_tooltips : "The class name for the AvatarFallback."
        },
        type : "string",
        default : "--",
       }
    ]
}

export default data;