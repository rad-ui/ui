const data = {
    name: 'Close',
    description: 'Dismiss control; calls the item dismiss handler after any onClick you provide.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'className', info_tooltips: 'Additional class names for the close button.' },
            type: 'string',
            default: "''",
        },
        {
            prop: { name: 'children', info_tooltips: 'Custom close affordance; defaults to ×.' },
            type: 'ReactNode',
            default: '×',
        },
        {
            prop: { name: 'onClick', info_tooltips: 'Runs before the toast is dismissed.' },
            type: 'function',
            default: '--',
        },
        {
            prop: { name: '…props', info_tooltips: 'Other button attributes (aria-*, etc.).' },
            type: 'ButtonHTMLAttributes<HTMLButtonElement>',
            default: '--',
        },
    ],
}

export default data
