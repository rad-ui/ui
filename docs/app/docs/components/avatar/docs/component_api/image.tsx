const data = {
    name : "Image",
    description : "The image component for the Avatar.",
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
            name : "src",
            info_tooltips : "The source of the image."
        },
        type : "string",
        default : "''",
       },
       {
        prop : {
            name : "alt",
            info_tooltips : "The alternative text for the image."
        },
        type : "string",
        default : "''",
       }
    ]
}

export default data;