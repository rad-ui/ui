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
        },
        {
            prop: { name: "asChild", info_tooltips: "Merges props onto the immediate child element instead of rendering a default div." },
            type: "boolean",
            default: "false",
        }
    ]
};

export default data;
