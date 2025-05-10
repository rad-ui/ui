const data = {
    name : "Root",
    description : "The root component for the AvatarGroup.",
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
            name : "customRootClass",
            info_tooltips : "The class name for the AvatarGroup."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "className",
            info_tooltips : "The class name for the AvatarGroup."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "size",
            info_tooltips : "The size of the AvatarGroup."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "variant",
            info_tooltips : "The variant of the AvatarGroup."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "children",
            info_tooltips : "The children of the AvatarGroup."
        },
        type : "React.ReactNode",
        default : "--",
       }
    ]
}

export default data;