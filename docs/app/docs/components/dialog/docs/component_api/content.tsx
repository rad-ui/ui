const data = {
    name : "Content",
    description : "The content component for the Dialog.",
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
        },
    ],
    data:[
        {
            prop : {
                name : "className",
                info_tooltips : "The class name for the DialogContent."
            },
            type : "string",
            default : "''",
        },
        {
            prop : {
                name : "children",
                info_tooltips : "The children of the DialogContent."
            },
            type : "ReactNode",
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
                info_tooltips : "Keep the content mounted when closed."
            },
            type : "boolean",
            default : "false",
        }
    ]
}

export default data;
