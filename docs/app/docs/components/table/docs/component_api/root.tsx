const data = {
    name : "Root",
    description : "The root component for the Table.",
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
            info_tooltips : "The class name for the TableRoot."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "children",
            info_tooltips : "The children of the Root."
        },
        type : "ReactNode",
        default : "--",
       },
       {
        prop : {
            name : "customRootClass",
            info_tooltips : "Custom class namespace used to swap the default table styles."
        },
        type : "string",
        default : "''",
       },
       {
        prop : {
            name : "size",
            info_tooltips : "Row density: small, medium or large."
        },
        type : "enum",
        enum_values : ["small", "medium", "large"],
        default : "'medium'",
       },
       {
        prop : {
            name : "variant",
            info_tooltips : "surface draws a framed panel with a header background; ghost sits directly on the page with only row dividers."
        },
        type : "enum",
        enum_values : ["surface", "ghost"],
        default : "'surface'",
       },
       {
        prop : {
            name : "resizable",
            info_tooltips : "Enables column resizing. Pass columnIndex to headers and cells and render a ColumnResizeHandle in each header."
        },
        type : "boolean",
        default : "false",
       },
       {
        prop : {
            name : "resizeHandleVisibility",
            info_tooltips : "When resizable, show the handles on hover or always."
        },
        type : "enum",
        enum_values : ["hover", "always"],
        default : "'hover'",
       },
]
}

export default data;
