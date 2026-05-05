const data = {
    name: "Header",
    description: "Wraps the title, description, and optional actions at the top of the card.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        {
            prop: { name: "children", info_tooltips: "Header contents, usually Card.Title and Card.Description." },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: { name: "className", info_tooltips: "Additional CSS class names for the header wrapper." },
            type: "string",
            default: "''",
        },
        {
            prop: { name: "asChild", info_tooltips: "Merges props onto the immediate child element instead of rendering a default div." },
            type: "boolean",
            default: "false",
        }
    ]
};

export default data;
