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
       {
        prop : {
            name : "orientation",
            info_tooltips : "Layout orientation for keyboard navigation and data attributes."
        },
        type : "enum",
        enum_values : ['horizontal', 'vertical'],
        default : "horizontal",
       },
       {
        prop : {
            name : "dir",
            info_tooltips : "Text direction used by roving focus."
        },
        type : "enum",
        enum_values : ['ltr', 'rtl'],
        default : "ltr",
       },
       {
        prop : {
            name : "activationMode",
            info_tooltips : "Whether focusing a trigger activates it automatically or only on click/enter/space."
        },
        type : "enum",
        enum_values : ['automatic', 'manual'],
        default : "automatic",
       },
       {
        prop : {
            name : "asChild",
            info_tooltips : "Render the root as the child element."
        },
        type : "boolean",
        default : "false",
       },
    ]
}

export default data;
