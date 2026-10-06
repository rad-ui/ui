const data = {
    name: 'Handle',
    description: 'An optional draggable handle that lets users dismiss the drawer by dragging outward.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'closeThreshold', info_tooltips: 'Pointer distance in pixels required before a drag closes the drawer.' },
            type: 'number',
            default: '80',
        },
        {
            prop: { name: 'className', info_tooltips: 'Additional class names for the handle.' },
            type: 'string',
            default: '--',
        },
    ],
}

export default data
