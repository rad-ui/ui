const data = {
    name: 'Content',
    description: 'The positioned drawer panel.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'children', info_tooltips: 'Panel contents, including title, description, controls, and optional handle.' },
            type: 'ReactNode',
            default: '--',
        },
        {
            prop: { name: 'forceMount', info_tooltips: 'Keeps content mounted when the drawer is closed.' },
            type: 'boolean',
            default: 'false',
        },
        {
            prop: { name: 'asChild', info_tooltips: 'Renders the content behavior onto the child element.' },
            type: 'boolean',
            default: 'false',
        },
        {
            prop: { name: 'className', info_tooltips: 'Additional class names for the content.' },
            type: 'string',
            default: '--',
        },
    ],
}

export default data
