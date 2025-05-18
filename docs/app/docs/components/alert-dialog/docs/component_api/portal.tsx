const data = {
    name : "Portal",
    description : "The portal component for the AlertDialog.",
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
                name : "children",
                info_tooltips : "The children of the AlertDialogPortal."
            },
            type : "ReactNode",
            default : "--",
        }
    ]
}

export default data;