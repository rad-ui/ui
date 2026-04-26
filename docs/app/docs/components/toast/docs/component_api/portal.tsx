const data = {
    name: 'Portal',
    description: 'Renders toast children into the theme portal root (or document.body).',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'children', info_tooltips: 'Typically Toast.Viewport and its items.' },
            type: 'ReactNode',
            default: '--',
        },
        {
            prop: { name: 'container', info_tooltips: 'Override portal target element.' },
            type: 'HTMLElement | null',
            default: 'theme portal / body',
        },
    ],
}

export default data
