const data = {
    name : "Cancel",
    description : "The cancel component for the AlertDialog.",
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
                info_tooltips : "The class name for the AlertDialogCancel."
            },
            
        },
        {
            prop : {
                name : "children",
                info_tooltips : "The children of the AlertDialogCancel."
            },
            type : "ReactNode",
            default : "--",
        },
        {
            prop : {
                name : "asChild",
                info_tooltips : "Whether to use the child component as the AlertDialogCancel."
            },
            type : "boolean",
            default : "false",
        }
    ]
}

export default data;