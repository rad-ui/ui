const data = {
    name: "Action",
    description: "An action slot for compact controls placed in the card header region.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        {
            prop: { name: "children", info_tooltips: "Interactive controls or other content rendered in the action slot." },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: { name: "className", info_tooltips: "Additional CSS class names for the action wrapper." },
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
