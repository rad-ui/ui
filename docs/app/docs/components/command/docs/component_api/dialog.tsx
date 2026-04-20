const data = {
    name: 'Dialog',
    description: 'A dialog-mounted command root built on the Rad UI dialog primitive.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' }
    ],
    data: [
        { prop: { name: 'open', info_tooltips: 'Controlled open state for the dialog wrapper.' }, type: 'boolean', default: '--' },
        { prop: { name: 'onOpenChange', info_tooltips: 'Called when the dialog wrapper requests an open-state change.' }, type: 'function', default: '--' },
        { prop: { name: 'onClickOutside', info_tooltips: 'Called when the overlay is clicked.' }, type: 'function', default: '--' },
        { prop: { name: 'container', info_tooltips: 'Optional portal container element.' }, type: 'Element', default: '--' }
    ]
};

export default data;
