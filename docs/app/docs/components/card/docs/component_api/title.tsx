const data = {
    name: "Title",
    description: "A semantic heading used for the card title.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        {
            prop: { name: "children", info_tooltips: "The title text or nodes." },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: { name: "className", info_tooltips: "Additional CSS class names for the title element." },
            type: "string",
            default: "''",
        }
    ]
};

export default data;
