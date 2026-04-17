const data = {
    name: "BlockQuote",
    description: "A component used to highlight and distinguish quoted content from the surrounding text, often used for testimonials, citations, or emphasis.",
    columns: [
        {
            name: "Prop",
            id: "prop",
        },
        {
            name: "Type",
            id: "type",
        },
        {
            name: "Default",
            id: "default",
        }
    ],
    data: [
        {
            prop: {
                name: "children",
                info_tooltips: "The content to be displayed inside the blockquote."
            },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: {
                name: "className",
                info_tooltips: "Additional CSS class names to apply to the blockquote."
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "customRootClass",
                info_tooltips: "Custom root class name to override default styling."
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "variant",
                info_tooltips: "Style variant of the blockquote."
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "size",
                info_tooltips: "Size variant of the blockquote (small, medium, large, x-large)."
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "color",
                info_tooltips: "Color theme of the blockquote."
            },
            type: "string",
            default: "''",
        }
    ]
};

export default data; 