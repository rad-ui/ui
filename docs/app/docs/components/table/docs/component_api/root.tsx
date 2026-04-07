const data = {
    name : "Root",
    description : "The root component for the Table.",
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
            info_tooltips : "The class name for the TableRoot."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "children",
            info_tooltips : "The children of the Root."
        },
        type : "ReactNode",
        default : "--",
       },
       {
        prop : {
            name : "customRootClass",
            info_tooltips : "Custom class namespace used to swap the default table styles."
        },
        type : "string",
        default : "''",
       },
    ]
}

export default data;
