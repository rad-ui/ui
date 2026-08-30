const data = {
    name: 'Close',
    description: 'A button-like part that closes the drawer intentionally.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'children', info_tooltips: 'Close control contents.' },
            type: 'ReactNode',
            default: '--',
        },
        {
            prop: { name: 'asChild', info_tooltips: 'Renders the close behavior onto the child element.' },
            type: 'boolean',
            default: 'false',
        },
        {
            prop: { name: 'className', info_tooltips: 'Additional class names for the close control.' },
            type: 'string',
            default: '--',
        },
    ],
}

export default data
