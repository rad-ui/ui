const data = {
    name : "Fallback",
    description : "The fallback component for the AvatarGroup.",
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
            info_tooltips : "Additional class names for the AvatarGroupFallback."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "asChild",
            info_tooltips : "Merges fallback props onto the immediate child element instead of rendering the default span."
        },
        type : "boolean",
        default : "false",
       }
    ]
}

export default data;
