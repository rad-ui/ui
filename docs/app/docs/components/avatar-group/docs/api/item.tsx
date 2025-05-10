const data = {
    name : "Item",
    description : "The item component for the AvatarGroup.",
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
            name : "color",
            info_tooltips : "The color of the AvatarGroupItem."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "children",
            info_tooltips : "The children of the AvatarGroupItem."
        },
        type : "React.ReactNode",
        default : "--",
       }
    ]
}

export default data;