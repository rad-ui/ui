const data = {
    name: 'Viewport',
    description: 'The notifications region (<ol>) that measures heights, handles hover expand, and positions the stack.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'children', info_tooltips: 'Toast.Root items for active notifications.' },
            type: 'ReactNode',
            default: '--',
        },
        {
            prop: { name: 'className', info_tooltips: 'Additional class names for the viewport element.' },
            type: 'string',
            default: "''",
        },
    ],
}

export default data
