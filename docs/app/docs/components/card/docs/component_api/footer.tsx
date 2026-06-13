const data = {
    name: "Footer",
    description: "The footer area for actions and secondary content.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        {
            prop: { name: "children", info_tooltips: "Footer contents, often buttons or links." },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: { name: "className", info_tooltips: "Additional CSS class names for the footer wrapper." },
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
