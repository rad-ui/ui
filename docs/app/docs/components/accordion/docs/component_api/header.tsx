const data = {
    name : "Header",
    description : "Wraps an Accordion.Trigger in the appropriate heading semantics.",
    columns : [
        { name : "Prop", id : "prop" },
        { name : "Type", id : "type" },
        { name: "Default", id : "default" }
    ],
    data:[
       {
        prop : { name : "className", info_tooltips : "Additional class names for the Accordion.Header wrapper." },
        type : "string",
        default : "''",
       },
       {
        prop: { name : "asChild", info_tooltips: 'Render the header as the child element instead of a native heading.' },
        type: 'boolean',
        default: 'false',
       }
    ]
}

export default data;
