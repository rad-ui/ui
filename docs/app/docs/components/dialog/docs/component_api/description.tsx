const data = {
    name : "Description",
    description : "The description component for the Dialog.",
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
                info_tooltips : "The class name for the DialogDescription."
            },
            
        },
        {
            prop : {
                name : "children",
                info_tooltips : "The children of the DialogDescription."
            },
            type : "ReactNode",
            default : "--",
        }
    ]
}

export default data;