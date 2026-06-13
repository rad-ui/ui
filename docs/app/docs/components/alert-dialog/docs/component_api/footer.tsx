const data = {
    name : "Footer",
    description : "A layout container for alert dialog actions.",
    columns : [
        { name : "Prop", id : "prop" },
        { name : "Type", id : "type" },
        { name: "Default", id : "default" }
    ],
    data:[
        {
            prop : { name : "className", info_tooltips : "Additional class names for the AlertDialog.Footer wrapper." },
            type : "string",
            default : "''",
        }
    ]
}

export default data;
