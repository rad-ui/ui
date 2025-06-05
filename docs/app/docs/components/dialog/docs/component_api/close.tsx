const data = {
    name : "Close",
    description : "The close component for the Dialog.",
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
                info_tooltips : "The class name for the DialogClose."
            },
            
        },
        {
            prop : {
                name : "children",
                info_tooltips : "The children of the DialogClose."
            },
            type : "ReactNode",
            default : "--",
        },
        {
            prop : {
                name : "asChild",
                info_tooltips : "Whether to use the child component as the DialogClose."
            },
            type : "boolean",
            default : "false",
        }
    ]
}

export default data;