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
        default : "--",
       },
       {
        prop : {
            name : "defaultOpen",
            info_tooltips : "Initial open state when the component is uncontrolled."
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
            name : "dismissOnOutsidePress",
            info_tooltips : "Whether pressing outside the dialog (including the overlay) closes it. Off by default, per the WAI-ARIA alertdialog pattern; Escape, Cancel and Action always close it."
        },
        type : "boolean",
        default : "false",
       },
    ]
}

export default data;
