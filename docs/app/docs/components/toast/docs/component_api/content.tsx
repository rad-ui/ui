const data = {
    name: 'Content',
    description: 'Card wrapper around the toast body; forwards standard div attributes.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'className', info_tooltips: 'Additional class names for the content container.' },
            type: 'string',
            default: "''",
        },
        {
            prop: { name: 'children', info_tooltips: 'Title, description, action, and close controls.' },
            type: 'ReactNode',
            default: '--',
        },
        {
            prop: { name: '…props', info_tooltips: 'Other HTML div attributes (style, id, data-*, etc.).' },
            type: 'HTMLAttributes<HTMLDivElement>',
            default: '--',
        },
    ],
}

export default data
