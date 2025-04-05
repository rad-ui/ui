const data = {
    name: "Em",
    description: "A component for emphasizing text by rendering it as an <em> element with italic styling.",
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
        },
        {
            name: "",
            id: "info_tooltips",
        }
    ],
    data: [
        {
            prop: {
                name: "children",
                info_tooltips: "The text content to emphasize."
            },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: {
                name: "className",
                info_tooltips: "Additional CSS class names to apply to the em element."
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
        }
    ]
};

export default data; 