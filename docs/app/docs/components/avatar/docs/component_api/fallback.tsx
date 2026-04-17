const data = {
    name : "Fallback",
    description : "The fallback component for the Avatar when the image fails to load.",
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
       },
       {
        prop : {
            name : "asChild",
            info_tooltips : "Render the fallback as the child element."
        },
        type : "boolean",
        default : "false",
       }
    ]
}

export default data;
