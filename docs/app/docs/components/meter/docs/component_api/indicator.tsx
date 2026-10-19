const data = {
    name: "Indicator",
    description: "Visual fill element for the Meter primitive.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        {
            prop: { name: "asChild", info_tooltips: "Render the indicator attributes onto the child element." },
            type: "boolean",
            default: "false"
        },
        {
            prop: { name: "className", info_tooltips: "Additional class names for the indicator." },
            type: "string",
            default: "--"
        },
        {
            prop: { name: "style", info_tooltips: "Inline styles merged with the computed transform." },
            type: "CSSProperties",
            default: "--"
        }
    ]
};

export default data;
