const data = {
    name: 'Title',
    description: 'Primary line of the toast; rendered as a heading for landmark semantics.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'className', info_tooltips: 'Additional class names for the title element.' },
            type: 'string',
            default: "''",
        },
        {
            prop: { name: 'children', info_tooltips: 'Title text or nodes (often from toast.title).' },
            type: 'ReactNode',
            default: '--',
        },
        {
            prop: { name: '…props', info_tooltips: 'Other HTML h2 attributes.' },
            type: 'HTMLAttributes<HTMLHeadingElement>',
            default: '--',
        },
    ],
}

export default data
