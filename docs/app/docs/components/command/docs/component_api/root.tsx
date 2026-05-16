const data = {
    name: 'Root',
    description: 'The inline command root. It owns filtering, keyboard navigation, and item registration.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' }
    ],
    data: [
        { prop: { name: 'value', info_tooltips: 'Controlled search value.' }, type: 'string', default: '--' },
        { prop: { name: 'defaultValue', info_tooltips: 'Initial search value in uncontrolled mode.' }, type: 'string', default: '""' },
        { prop: { name: 'onValueChange', info_tooltips: 'Called when the search value changes.' }, type: 'function', default: '--' },
        { prop: { name: 'label', info_tooltips: 'Accessible label applied to the input and list.' }, type: 'string', default: '"Command menu"' },
        { prop: { name: 'shouldFilter', info_tooltips: 'Disables built-in filtering when false.' }, type: 'boolean', default: 'true' },
        { prop: { name: 'filter', info_tooltips: 'Custom scoring function for built-in filtering.' }, type: '(value, search, keywords) => number', default: '--' },
        { prop: { name: 'loop', info_tooltips: 'Wrap keyboard navigation from end to start.' }, type: 'boolean', default: 'false' }
    ]
};

export default data;
