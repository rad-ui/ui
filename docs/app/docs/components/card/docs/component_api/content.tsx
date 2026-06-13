const data = {
    name: "Content",
    description: "The main body area for card content.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        {
            prop: { name: "children", info_tooltips: "The main card body contents." },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: { name: "className", info_tooltips: "Additional CSS class names for the content wrapper." },
            type: "string",
            default: "''",
        }
    ]
};

export default data;
