const data = {
    name : "Root",
    description : "The root component for the Dialog.",
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
            info_tooltips : "The class name for the DialogRoot."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "customRootClass",
            info_tooltips : "The custom class name for the DialogRoot."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "open",
            info_tooltips : "The boolean to control the open state of the DialogRoot."
        },
        type : "boolean",
        default : "--",
       },
       {
        prop : {
            name : "children",
            info_tooltips : "The dialog parts rendered inside the root."
        },
        type : "ReactNode",
        default : "--",
       },
       {
        prop : {
            name : "defaultOpen",
            info_tooltips : "Not supported on this wrapper; control initial state by managing open in your own state."
        },
        type : "n/a",
        default : "--",
       },
       {
        prop : {
            name : "onOpenChange",
            info_tooltips : "The function to handle the open change of the DialogRoot."
        },
        type : "function",
        default : "--",
       },
       {
        prop : {
            name : "onClickOutside",
            info_tooltips : "The function to handle the click outside of the DialogRoot."
        },
        type : "function",
        default : "--",
       }
    ]
}

export default data;
