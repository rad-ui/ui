const data = {
    name : "Root",
    description : "The root component for the AlertDialog.",
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
            info_tooltips : "The class name for the AlertDialogRoot."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "customRootClass",
            info_tooltips : "The custom class name for the AlertDialogRoot."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "open",
            info_tooltips : "The boolean to control the open state of the AlertDialogRoot."
        },
        type : "boolean",
        default : "false",
       },
       {
        prop : {
            name : "onOpenChange",
            info_tooltips : "The function to handle the open change of the AlertDialogRoot."
        },
        type : "function",
        default : "--",
       },
       {
        prop : {
            name : "onClickOutside",
            info_tooltips : "The function to handle the click outside of the AlertDialogRoot."
        },
        type : "function",
        default : "--",
       }
    ]
}

export default data;