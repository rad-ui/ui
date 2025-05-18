const data = {
    name : "List",
    description : "The list component for the Tabs. This component is used to display the list of Tabs.",
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
            info_tooltips : "The class name for the TabsList."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "children",
            info_tooltips : "The children of the TabsList."
        },
        type : "ReactNode",
       }
    ]
}

export default data;