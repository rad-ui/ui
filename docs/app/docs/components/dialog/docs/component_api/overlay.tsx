const data = {
    name : "Overlay",
    description : "The overlay component for the Dialog.",
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
                info_tooltips : "The class name for the DialogOverlay."
            },
            type : "string",
            default : "''",
        },
        {
            prop : {
                name : "asChild",
                info_tooltips : "Render the overlay as the child element."
            },
            type : "boolean",
            default : "false",
        },
        {
            prop : {
                name : "forceMount",
                info_tooltips : "Keep the overlay mounted when closed."
            },
            type : "boolean",
            default : "false",
        }
    ]
}

export default data;
