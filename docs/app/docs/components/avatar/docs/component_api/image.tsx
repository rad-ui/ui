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
        default : "--",
       },
       {
        prop : {
            name : "alt",
            info_tooltips : "The alternative text for the image."
        },
        type : "string",
        default : "''",
       },
        { prop: { name: "onLoadingStatusChange", info_tooltips: "Called with loading, loaded or error as the image loads, fails or changes src (a missing src reports error)." }, type: "(status) => void", default: "--" }
    ]
}

export default data;
