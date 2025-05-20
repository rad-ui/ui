const data = {
    name : "Cell",
    description : "The cell component for the Table.",
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
            info_tooltips : "The class name for the Cell."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "children",
            info_tooltips : "The children of the Cell."
        },
        type : "ReactNode",
       },
    ]
}

export default data;