const data = {
    name: "Root",
    description: "Root component for announcing dynamic updates to assistive technologies.",
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
                name: "politeness",
                info_tooltips: "Sets the aria-live politeness level for updates."
            },
            type: "'polite' | 'assertive' | 'off'",
            default: "'polite'",
        },
        {
            prop: {
                name: "role",
                info_tooltips: "Sets the live region role. Defaults to alert for assertive regions and status otherwise."
            },
            type: "'status' | 'alert' | 'log'",
            default: "'status'",
        },
        {
            prop: {
                name: "atomic",
                info_tooltips: "Controls whether the full region is announced when content changes."
            },
            type: "boolean",
            default: "true",
        },
        {
            prop: {
                name: "relevant",
                info_tooltips: "Controls which content changes should be announced."
            },
            type: "'additions' | 'removals' | 'text' | 'all' | 'additions text'",
            default: "'additions text'",
        },
        {
            prop: {
                name: "busy",
                info_tooltips: "Marks the region as busy while related updates are pending."
            },
            type: "boolean",
            default: "--",
        },
        {
            prop: {
                name: "visuallyHidden",
                info_tooltips: "Keeps the region available to screen readers while visually hiding it."
            },
            type: "boolean",
            default: "true",
        },
        {
            prop: {
                name: "customRootClass",
                info_tooltips: "Custom root class namespace override."
            },
            type: "string",
            default: "''",
        }
    ]
};

export default data;
