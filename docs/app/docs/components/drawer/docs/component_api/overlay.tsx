const data = {
    name: 'Overlay',
    description: 'The backdrop layer that can lock scroll and dismiss the drawer.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'forceMount', info_tooltips: 'Keeps the overlay mounted when the drawer is closed.' },
            type: 'boolean',
            default: 'false',
        },
        {
            prop: { name: 'className', info_tooltips: 'Additional class names for the overlay.' },
            type: 'string',
            default: '--',
        },
    ],
}

export default data
