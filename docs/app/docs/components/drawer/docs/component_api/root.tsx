const data = {
    name: 'Root',
    description: 'The root component that owns drawer state, modal behavior, snap point state, and child drawer nesting.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'children', info_tooltips: 'Drawer parts rendered inside the root.' },
            type: 'ReactNode',
            default: '--',
        },
        {
            prop: { name: 'defaultOpen', info_tooltips: 'Initial open state for uncontrolled drawers.' },
            type: 'boolean',
            default: 'false',
        },
        {
            prop: { name: 'open', info_tooltips: 'Controlled open state.' },
            type: 'boolean',
            default: '--',
        },
        {
            prop: { name: 'onOpenChange', info_tooltips: 'Called when the drawer requests an open state change.' },
            type: '(open: boolean) => void',
            default: '--',
        },
        {
            prop: { name: 'onOpenChangeComplete', info_tooltips: 'Called after the open or close animation completes.' },
            type: '(open: boolean) => void',
            default: '--',
        },
        {
            prop: { name: 'modal', info_tooltips: 'Controls focus trapping, scroll locking, and outside interaction policy.' },
            type: "boolean | 'trap-focus'",
            default: 'true',
        },
        {
            prop: { name: 'swipeDirection', info_tooltips: 'Direction used for placement and swipe-to-dismiss behavior.' },
            type: "'left' | 'right' | 'top' | 'bottom'",
            default: "'right'",
        },
        {
            prop: { name: 'disablePointerDismissal', info_tooltips: 'Prevents outside pointer interactions from closing the drawer.' },
            type: 'boolean',
            default: 'false',
        },
        {
            prop: { name: 'snapPoints', info_tooltips: 'Available snap points as viewport fractions, pixel numbers, or CSS length strings.' },
            type: 'Array<number | string>',
            default: '[]',
        },
        {
            prop: { name: 'snapPoint', info_tooltips: 'Controlled active snap point.' },
            type: 'number | string | null',
            default: '--',
        },
        {
            prop: { name: 'onSnapPointChange', info_tooltips: 'Called when the active snap point changes.' },
            type: '(snapPoint: number | string | null) => void',
            default: '--',
        },
        {
            prop: { name: 'actionsRef', info_tooltips: 'Imperative close and unmount actions.' },
            type: 'RefObject<DrawerRootActions | null>',
            default: '--',
        },
        {
            prop: { name: 'customRootClass', info_tooltips: 'Overrides the generated Drawer class namespace.' },
            type: 'string',
            default: "''",
        },
    ],
}

export default data
