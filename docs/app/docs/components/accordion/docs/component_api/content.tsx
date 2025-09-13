const data = {
    name: "Content",
    description: "The content component for the Accordion. This component contains the collapsible content that is shown/hidden when the trigger is activated.",
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
                info_tooltips: "The class name for the AccordionContent."
            },
            type: "string",
            default: "--",
        },
        {
            prop: {
                name: "asChild",
                info_tooltips: "Whether to use the child component as the AccordionContent."
            },
            type: "boolean",
            default: "false",
        }
    ]
}

export default data;
