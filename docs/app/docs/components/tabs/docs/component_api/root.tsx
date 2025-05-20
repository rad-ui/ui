const data = {
    name : "Root",
    description : "The root component for the Tabs.",
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
            info_tooltips : "The class name for the TabRoot."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "customRootClass",
            info_tooltips : "The custom class name for the TabRoot."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "children",
            info_tooltips : "The children of the TabRoot."
        },
        type : "ReactNode",
        required:true
       },
       {
        prop : {
            name : "value",
            info_tooltips : "The value of the TabRoot."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "color",
            info_tooltips : "The color of the TabRoot."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "defaultValue",
            info_tooltips : "The default value of the TabRoot."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "onValueChange",
            info_tooltips : "The onValueChange of the TabRoot."
        },
        type : "function",
        default : "--",
       },
       
    ]
}

export default data;