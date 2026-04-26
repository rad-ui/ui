const data = {
    name: 'Action',
    description: 'Optional action button; toast.actionProps are merged first, then your props.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'type', info_tooltips: 'Button type attribute.' },
            type: 'string',
            default: 'button',
        },
        {
            prop: { name: 'className', info_tooltips: 'Additional class names for the action button.' },
            type: 'string',
            default: "''",
        },
        {
            prop: { name: 'children', info_tooltips: 'Label when toast.actionProps.children is not set.' },
            type: 'ReactNode',
            default: '--',
        },
        {
            prop: { name: '…props', info_tooltips: 'Other button attributes; overrides actionProps where duplicated.' },
            type: 'ButtonHTMLAttributes<HTMLButtonElement>',
            default: '--',
        },
    ],
}

export default data
