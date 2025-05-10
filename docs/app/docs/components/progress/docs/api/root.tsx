const data = {
    name: "Root",
    description: "Root component for the Progress component.",
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
                name: "value",
                info_tooltips: "The current value of the progress bar, clamped between minValue and maxValue."
            },
            type: "number",
            default: "0",
        },
        {
            prop: {
                name: "minValue",
                info_tooltips: "The minimum value of the progress bar."
            },
            type: "number",
            default: "0",
        },
        {
            prop: {
                name: "maxValue",
                info_tooltips: "The maximum value of the progress bar."
            },
            type: "number",
            default: "100",
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