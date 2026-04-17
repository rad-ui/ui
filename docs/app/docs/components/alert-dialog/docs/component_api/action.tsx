const data = {
    name : "Action",
    description : "The action component for the AlertDialog.",
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
        },
    ],
    data:[
        {
            prop : {
                name : "className",
                info_tooltips : "The class name for the AlertDialogAction."
            },
            
        },
        {
            prop : {
                name : "children",
                info_tooltips : "The children of the AlertDialogAction."
            },
            type : "ReactNode",
            default : "--",
        },
        {
            prop : {
                name : "asChild",
                info_tooltips : "Whether to use the child component as the AlertDialogAction."
            },
            type : "boolean",
            default : "false",
        }
    ]
}

export default data;