const data = {
    name: 'Provider',
    description: 'Wraps your app (or a subtree) and owns toast state, stacking, and the active toast manager.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'children', info_tooltips: 'Your app UI and the toast portal subtree.' },
            type: 'ReactNode',
            default: '--',
        },
        {
            prop: { name: 'customRootClass', info_tooltips: 'Optional root class token passed through the theme helper.' },
            type: 'string',
            default: "''",
        },
        {
            prop: { name: 'position', info_tooltips: 'Viewport corner or edge (e.g. bottom-right, top-center).' },
            type: 'string',
            default: 'bottom-right',
        },
        {
            prop: { name: 'expand', info_tooltips: 'When true, all toasts stay fully expanded instead of stacked peek.' },
            type: 'boolean',
            default: 'false',
        },
        {
            prop: { name: 'gap', info_tooltips: 'Pixel gap between toasts in the expanded stack measurement.' },
            type: 'number',
            default: '14',
        },
        {
            prop: { name: 'limit', info_tooltips: 'Max visible toasts in the stack (Base UI name).' },
            type: 'number',
            default: '3',
        },
        {
            prop: { name: 'maxToasts', info_tooltips: 'Deprecated alias for limit.' },
            type: 'number',
            default: '--',
        },
        {
            prop: { name: 'timeout', info_tooltips: 'Default auto-dismiss duration in ms for new toasts.' },
            type: 'number',
            default: '5000',
        },
        {
            prop: { name: 'toastManager', info_tooltips: 'Isolated manager from createToastManager(); omit to use the singleton.' },
            type: 'ToastManager',
            default: '--',
        },
    ],
}

export default data
