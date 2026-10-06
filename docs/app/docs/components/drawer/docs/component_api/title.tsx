const data = {
    name: 'Title',
    description: 'A heading part for naming the drawer content.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'children', info_tooltips: 'Title contents.' },
            type: 'ReactNode',
            default: '--',
        },
        {
            prop: { name: 'className', info_tooltips: 'Additional class names for the title.' },
            type: 'string',
            default: '--',
        },
    ],
}

export default data
