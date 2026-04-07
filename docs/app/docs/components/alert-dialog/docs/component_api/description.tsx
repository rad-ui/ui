const data = {
    name : "Description",
    description : "The description component for the AlertDialog.",
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
                info_tooltips : "The class name for the AlertDialogDescription."
            },
            type : "string",
            default : "''",
        },
        {
            prop : {
                name : "children",
                info_tooltips : "The children of the AlertDialogDescription."
            },
            type : "ReactNode",
            default : "--",
        },
        {
            prop : {
                name : "asChild",
                info_tooltips : "Render the description as the child element."
            },
            type : "boolean",
            default : "false",
        },
        {
            prop : {
                name : "id",
                info_tooltips : "Optional id used for aria-describedby."
            },
            type : "string",
            default : "auto",
        }
    ]
}

export default data;
