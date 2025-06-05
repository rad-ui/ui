const data = {
    name : "Title",
    description : "The title component for the Dialog.",
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
                info_tooltips : "The class name for the DialogTitle."
            },
            
        },
        {
            prop : {
                name : "children",
                info_tooltips : "The children of the DialogTitle."
            },
            type : "ReactNode",
            default : "--",
        }
    ]
}

export default data;