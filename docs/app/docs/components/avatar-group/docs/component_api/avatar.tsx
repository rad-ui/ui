const data = {
    name : "Avatar",
    description : "The avatar component for the AvatarGroup.",
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
            info_tooltips : "The source of the avatar."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "alt",
            info_tooltips : "The alt text for the avatar."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "asChild",
            info_tooltips : "Merges avatar image props onto the immediate child element."
        },
        type : "boolean",
        default : "false",
       }
    ]
}

export default data;
