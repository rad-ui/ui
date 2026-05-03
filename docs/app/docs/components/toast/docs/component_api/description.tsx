const data = {
    name: 'Description',
    description: 'Secondary copy for the toast; optional when only a title is shown.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'className', info_tooltips: 'Additional class names for the description element.' },
            type: 'string',
            default: "''",
        },
        {
            prop: { name: 'children', info_tooltips: 'Supporting text (often from toast.description).' },
            type: 'ReactNode',
            default: '--',
        },
        {
            prop: { name: '…props', info_tooltips: 'Other HTML paragraph attributes.' },
            type: 'HTMLAttributes<HTMLParagraphElement>',
            default: '--',
        },
    ],
}

export default data
