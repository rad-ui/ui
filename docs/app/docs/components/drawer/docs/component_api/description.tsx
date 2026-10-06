const data = {
    name: 'Description',
    description: 'A text part for describing the drawer content.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'children', info_tooltips: 'Description contents.' },
            type: 'ReactNode',
            default: '--',
        },
        {
            prop: { name: 'className', info_tooltips: 'Additional class names for the description.' },
            type: 'string',
            default: '--',
        },
    ],
}

export default data
