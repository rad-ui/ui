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
       },
       {
        prop : {
            name : "asChild",
            info_tooltips : "Render the list as the child element."
        },
        type : "boolean",
        default : "false",
       }
    ]
}

export default data;
