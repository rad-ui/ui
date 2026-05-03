const data = {
    name: 'Root',
    description: 'One toast item (<li>): timers, swipe-to-dismiss, stack transforms, and live region semantics.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'toast', info_tooltips: 'Toast data from the manager (id, title, variant, actionProps, …).' },
            type: 'ToastData',
            default: '--',
        },
        {
            prop: { name: 'children', info_tooltips: 'Usually Toast.Content and controls.' },
            type: 'ReactNode',
            default: '--',
        },
        {
            prop: { name: 'className', info_tooltips: 'Additional class names for the list item.' },
            type: 'string',
            default: "''",
        },
    ],
}

export default data
