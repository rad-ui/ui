const data = {
    name : "Content",
    description : "The content component for the Dialog.",
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
        },
    ],
    data:[
        {
            prop : {
                name : "className",
                info_tooltips : "The class name for the DialogContent."
            },
            type : "string",
            default : "''",
        },
        {
            prop : {
                name : "children",
                info_tooltips : "The children of the DialogContent."
            },
            type : "ReactNode",
            default : "--",
        },
        {
            prop : {
                name : "asChild",
                info_tooltips : "Render the content as the child element."
            },
            type : "boolean",
            default : "false",
        },
        {
            prop : {
                name : "forceMount",
                info_tooltips : "Keep the content mounted when closed."
            },
            type : "boolean",
            default : "false",
        },
        {
            prop : {
                name : "initialFocus",
                info_tooltips : "Where focus goes when the dialog opens: true for the first focusable element, false for none, a ref to an element, or a function returning an element (or true/false)."
            },
            type : "boolean | RefObject<HTMLElement> | () => HTMLElement | boolean",
            default : "true",
        },
        {
            prop : {
                name : "finalFocus",
                info_tooltips : "Where focus goes after the dialog closes: true for the trigger (or whatever was focused before opening), false to leave it, a ref, or a function returning an element."
            },
            type : "boolean | RefObject<HTMLElement> | () => HTMLElement | boolean",
            default : "true",
        },
        {
            prop : {
                name : "trapFocus",
                info_tooltips : "Keep Tab and Shift+Tab inside the dialog while it's open."
            },
            type : "boolean",
            default : "true",
        }
    ]
}

export default data;
