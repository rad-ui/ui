const data = {
    name: "Root",
    description: "The outer card container. Storybook uses this as the main entry point, with compound subcomponents inside.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        {
            prop: { name: "children", info_tooltips: "The card sections rendered inside the container." },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: { name: "className", info_tooltips: "Additional CSS class names applied to the card root." },
            type: "string",
            default: "''",
        },
        {
            prop: { name: "customRootClass", info_tooltips: "Custom class namespace to replace the default card styling hook." },
            type: "string",
            default: "--",
        },
        {
            prop: { name: "variant", info_tooltips: "Visual variant token used by the card theme." },
            type: "string",
            default: "''",
        },
        {
            prop: { name: "size", info_tooltips: "Size token used by the card theme." },
            type: "string",
            default: "''",
        }
    ]
};

export default data;
