const data = {
    name: 'Trigger',
    description: 'A button-like part that opens the drawer.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'children', info_tooltips: 'Trigger contents.' },
            type: 'ReactNode',
            default: '--',
        },
        {
            prop: { name: 'asChild', info_tooltips: 'Renders the trigger behavior onto the child element.' },
            type: 'boolean',
            default: 'false',
        },
        {
            prop: { name: 'className', info_tooltips: 'Additional class names for the trigger.' },
            type: 'string',
            default: '--',
        },
    ],
}

export default data
