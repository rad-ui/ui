const data = {
    name : "ColumnCellHeader",
    description : "The table header-cell component rendered inside a Table.Row.",
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
            info_tooltips : "The class name for the ColumnCellHeader."
        },
        type : "string",
        default : "cell-header",
       },
       {
        prop : {
            name : "children",
            info_tooltips : "The contents of the header cell."
        },
        type : "ReactNode",
        default : "--",
       },
       {
        prop : {
            name : "asChild",
            info_tooltips : "Merges props onto the immediate child element instead of rendering the default th."
        },
        type : "boolean",
        default : "false",
       },
    ]
}

export default data;
