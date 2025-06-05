const data = {
    name : "Content",
    description : "The content component for the Dialog.",
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
                info_tooltips : "The class name for the DialogContent."
            },
            
        },
        {
            prop : {
                name : "children",
                info_tooltips : "The children of the DialogContent."
            },
            type : "ReactNode",
            default : "--",
        }
    ]
}

export default data;