const data = {
    name: "Progress",
    description: "A component that displays the completion status of a task or process, such as uploading a file, loading content, or completing form steps.",
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
                name: "color",
                info_tooltips: "Color theme of the progress indicator."
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
                name: "renderLabel",
                info_tooltips: "Function that returns a JSX element to render a custom label within the progress bar."
            },
            type: "function",
            default: "--",
        }
    ]
};

export default data; 