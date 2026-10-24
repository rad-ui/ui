const data = {
    name : "Trigger",
    description : "The trigger component for the Dialog.",
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
            info_tooltips : "The class name for the DialogTrigger."
        },
        type : "string",
        default : "--",
       },
       {
        prop: {
            name : "asChild",
            info_tooltips: 'Whether to use the child component as the DialogTrigger.'
        },
        type: 'boolean',
        default: 'false',
       },
        { prop: { name: "handle", info_tooltips: "Open the Root connected to this handle, from anywhere in the page." }, type: "Handle", default: "--" },
        { prop: { name: "payload", info_tooltips: "Data for the content, such as the row this trigger belongs to." }, type: "unknown", default: "--" }
    ]
}

export default data;