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
                info_tooltips: "The current value of the progress bar. Use null for an indeterminate state."
            },
            type: "number | null",
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
        },
        {
            prop: {
                name: "children",
                info_tooltips: "Usually a Progress.Indicator element."
            },
            type: "ReactNode",
            default: "--",
        },
        {
            prop: {
                name: "getValueLabel",
                info_tooltips: "Function used to generate an accessible label for the current value."
            },
            type: "function",
            default: "--",
        },
        { prop: { name: "format", info_tooltips: "Intl.NumberFormat options for the value text and the Value part; also sets aria-valuetext." }, type: "Intl.NumberFormatOptions", default: "--" },
        { prop: { name: "locale", info_tooltips: "Locale for format." }, type: "string", default: "browser locale" }
    ]
};

export default data; 
