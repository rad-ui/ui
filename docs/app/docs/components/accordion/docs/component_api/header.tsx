const data = {
    name: "Header",
    description: "The header component for the Accordion. This component wraps the trigger and provides the header structure for each accordion item.",
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
                name: "className",
                info_tooltips: "The class name for the AccordionHeader."
            },
            type: "string",
            default: "--",
        },
        {
            prop: {
                name: "asChild",
                info_tooltips: "Whether to use the child component as the AccordionHeader."
            },
            type: "boolean",
            default: "false",
        }
    ]
}

export default data;
