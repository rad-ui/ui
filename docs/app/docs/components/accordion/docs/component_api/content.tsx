const data = {
    name : "Content",
    description : "Contains the collapsible panel for an Accordion item.",
    columns : [
        { name : "Prop", id : "prop" },
        { name : "Type", id : "type" },
        { name: "Default", id : "default" }
    ],
    data:[
       {
        prop : { name : "className", info_tooltips : "Additional class names for the Accordion.Content element." },
        type : "string",
        default : "''",
       },
       {
        prop: { name : "forceMount", info_tooltips: 'Keep the content mounted even when the item is closed.' },
        type: 'boolean',
        default: 'false',
       },
       {
        prop: { name : "asChild", info_tooltips: 'Render the content as the child element instead of a default div wrapper.' },
        type: 'boolean',
        default: 'false',
       }
    ]
}

export default data;
