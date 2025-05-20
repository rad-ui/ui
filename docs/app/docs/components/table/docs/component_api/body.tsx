const data = {
    name : "Body",
    description : "The body component for the Table.",
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
            name : "className",
            info_tooltips : "The class name for the Body."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "children",
            info_tooltips : "The children of the Body."
        },
       },
    ]
}

export default data;