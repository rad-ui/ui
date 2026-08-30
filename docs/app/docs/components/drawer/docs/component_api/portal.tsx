const data = {
    name: 'Portal',
    description: 'Portals drawer overlay and content outside the normal DOM flow.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'children', info_tooltips: 'Overlay and content parts to portal.' },
            type: 'ReactNode',
            default: '--',
        },
    ],
}

export default data
