const data = {
    name: 'Item',
    description: 'A selectable command option.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' }
    ],
    data: [
        { prop: { name: 'value', info_tooltips: 'Submitted to onSelect. Falls back to text content when possible.' }, type: 'string', default: '--' },
        { prop: { name: 'keywords', info_tooltips: 'Extra search terms used by the built-in filter.' }, type: 'string[]', default: '[]' },
        { prop: { name: 'onSelect', info_tooltips: 'Called when the item is chosen.' }, type: '(value: string) => void', default: '--' },
        { prop: { name: 'disabled', info_tooltips: 'Prevents selection.' }, type: 'boolean', default: 'false' },
        { prop: { name: 'forceMount', info_tooltips: 'Keeps the item mounted even when filtered out.' }, type: 'boolean', default: 'false' }
    ]
};

export default data;
