const data = {
    name: "Root",
    description: "The navigation landmark that labels the breadcrumb trail.",
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
                name: "aria-label",
                info_tooltips: "Accessible name for the breadcrumb navigation landmark."
            },
            type: "string",
            default: "'Breadcrumb'",
        },
        {
            prop: {
                name: "customRootClass",
                info_tooltips: "Class namespace used to generate the component part class."
            },
            type: "string",
            default: "''",
        },
        {
            prop: {
                name: "className",
                info_tooltips: "Additional class names for the root element."
            },
            type: "string",
            default: "''",
        }
    ]
};

export default data;
