const data = {
    name: "Description",
    description: "Supporting text displayed under the card title.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        {
            prop: { name: "children", info_tooltips: "The description text or nodes." },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: { name: "className", info_tooltips: "Additional CSS class names for the description element." },
            type: "string",
            default: "''",
        }
    ]
};

export default data;
