const data = {
    name : "Root",
    description : "The root component for the Accordion.",
    columns : [
        {
            name : "Prop",
            id : "prop",
        },
        {
            name : "Type",
            id : "type",
        },
        {
            name: "Default",
            id : "default",
        }
    ],
    data:[
       {
        prop : {
            name : "className",
            info_tooltips : "The class name for the AccordionRoot."
        },
        type : "string",
        default : "--",
       },
       {
        prop: {
            name : "asChild",
            info_tooltips: 'Whether to use the child component as the Accordion.'
        },
        type: 'boolean',
        default: 'false',
       },
       {
        prop: {
            name : "loop",
            info_tooltips: 'Whether to loop through the Accordion items.'
        },
        type: 'boolean',
        default: 'true',
       },
       {
        prop: {
            name : "orientation",
            info_tooltips: 'The orientation of the Accordion.'
        },
        type: 'enum',
        enum_values : ['horizontal', 'vertical'],
        default: 'vertical',
       },
       {
        prop: {
            name : "disableTabIndexing",
            info_tooltips: 'Disables the roving tabindex behavior for keyboard navigation.'
        },
        type: 'boolean',
        default: 'false',
       },
       {
        prop : {
            name : "disabled",
            info_tooltips : "Disables all accordion items."
        },
        type : "boolean",
        default : "false",
       },
       {
        prop : {
            name : "transitionDuration",
            info_tooltips : "Transition duration in milliseconds for item open and close animations."
        },
        type : "number",
        default : "0",
       },
       {
        prop : {
            name : "transitionTimingFunction",
            info_tooltips : "CSS timing function used by accordion transitions."
        },
        type : "string",
        default : "linear",
       },
       {
        prop : {
            name : "openMultiple",
            info_tooltips : "Deprecated alias for allowing multiple items to be open at once. Prefer type='multiple'."
        },
        type : "boolean",
        default : "false",
       },
       {
        prop : {
            name : "type",
            info_tooltips : "Selection mode for the accordion."
        },
        type : "enum",
        enum_values : ['single', 'multiple'],
        default : "single",
       },
       {
        prop : {
            name : "collapsible",
            info_tooltips : "When type is single, allows the currently open item to be closed."
        },
        type : "boolean",
        default : "false",
       },
       {
        prop : {
            name : "value",
            info_tooltips : "Controlled open item values."
        },
        type : "(string | number)[]",
        default : "--",
       },
       {
        prop : {
            name : "defaultValue",
            info_tooltips : "Initial open item values for uncontrolled usage."
        },
        type : "(string | number)[]",
        default : "[]",
       },
       {
        prop : {
            name : "onValueChange",
            info_tooltips : "Called whenever the set of open item values changes."
        },
        type : "function",
        default : "--",
       }
    ]
}

export default data;
