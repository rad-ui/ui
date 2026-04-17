const data = {
    name : "Portal",
    description : "The portal component for the Dialog.",
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
                name : "children",
                info_tooltips : "The children of the DialogPortal."
            },
            type : "ReactNode",
            default : "--",
        }
        ,{
            prop : {
                name : "container",
                info_tooltips : "Custom DOM node used as the portal mount point."
            },
            type : "Element | null",
            default : "--",
        }
        ,{
            prop : {
                name : "forceMount",
                info_tooltips : "Keeps portal internals mounted even before opening."
            },
            type : "boolean",
            default : "false",
        }
        ,{
            prop : {
                name : "keepMounted",
                info_tooltips : "Retains portal content in the DOM after close when supported by the primitive."
            },
            type : "boolean",
            default : "false",
        }
    ]
}

export default data;
