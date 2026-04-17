const data = {
    name : "Content",
    description : "The content component for the Tabs. This component is used to display the content of the Tabs.",
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
            info_tooltips : "The class name for the TabContent."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "value",
            info_tooltips : "The value of the TabContent."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "children",
            info_tooltips : "The children of the TabContent."
        },
        type : "ReactNode",
        default : "--",
        required:true
       },
       {
        prop : {
            name : "customRootClass",
            info_tooltips : "Custom class namespace used for the content wrapper."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "asChild",
            info_tooltips : "Render the content as the child element."
        },
        type : "boolean",
        default : "false",
       },
       {
        prop : {
            name : "forceMount",
            info_tooltips : "Keep the content mounted even when it is inactive."
        },
        type : "boolean",
        default : "false",
       }
    ]
}

export default data;
