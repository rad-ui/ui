const data = {
    name : "Content",
    description : "The content component for the AlertDialog.",
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
                info_tooltips : "The class name for the AlertDialogContent."
            },
            
        },
        {
            prop : {
                name : "children",
                info_tooltips : "The children of the AlertDialogContent."
            },
            type : "ReactNode",
            default : "--",
        }
    ]
}

export default data;