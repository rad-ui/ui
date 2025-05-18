const data = {
    name : "Trigger",
    description : "The trigger component for the Tabs. This component is used to toggle the visibility of the Tab.",
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
            info_tooltips : "The class name for the TabTrigger."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "children",
            info_tooltips : "The children of the TabTrigger."
        },
        type : "ReactNode",
        required:true
       },
       {
        prop : {
            name : "disabled",
            info_tooltips : "Whether the TabTrigger is disabled."
        },
        type : "boolean",
        default : "false",
       },
       {
        prop : {
            name : "value",
            info_tooltips : "The value of the TabTrigger."
        },
        type : "string",
        default : "--",
       },
       
    ]
}

export default data;