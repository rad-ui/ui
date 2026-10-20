const data = {
    name : "Cell",
    description : "The cell component for the Table.",
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
                info_tooltips : "The class name for the Cell."
            },
            type : "string",
            default : "cell",
       },
       {
        prop : {
            name : "children",
            info_tooltips : "The children of the Cell."
        },
        type : "ReactNode",
        default : "--",
       },
       {
        prop : {
            name : "asChild",
            info_tooltips : "Merges props onto the immediate child element instead of rendering the default td."
        },
        type : "boolean",
        default : "false",
       },
       {
        prop : {
            name : "align",
            info_tooltips : "Horizontal alignment of the content. Use end for numeric columns so digits line up."
        },
        type : "enum",
        enum_values : ["start", "center", "end"],
        default : "'start'",
       },
]
}

export default data;
