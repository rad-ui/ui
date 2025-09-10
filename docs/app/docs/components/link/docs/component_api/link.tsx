const data = {
    name: "Link",
    description: "Hyperlink component for navigation between pages or external resources.",
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
                name: "href",
                info_tooltips: "Destination URL for the link.",
            },
            type: "string",
            default: "--",
        },
        {
            prop: {
                name: "children",
                info_tooltips: "Link text or element.",
            },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: {
                name: "target",
                info_tooltips: "Where to open the linked document.",
            },
            type: "string",
            default: "'_self'",
        },
        {
            prop: {
                name: "size",
                info_tooltips: "Visual size of the link.",
            },
            type: "string",
            default: "'medium'",
        },
        {
            prop: {
                name: "className",
                info_tooltips: "Additional CSS class names.",
            },
            type: "string",
            default: "''",
        }
    ]
};

export default data;
