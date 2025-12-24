const data = {
  name: 'Root',
  description: 'Provides context for the popover.',
  columns: [
    { name: 'Prop', id: 'prop' },
    { name: 'Type', id: 'type' },
    { name: 'Default', id: 'default' }
  ],
  data: [
    {
      prop: { name: 'open', info_tooltips: 'Controlled open state.' },
      type: 'boolean',
      default: '--'
    },
    {
      prop: { name: 'defaultOpen', info_tooltips: 'Whether the popover is open by default.' },
      type: 'boolean',
      default: 'false'
    },
    {
      prop: { name: 'onOpenChange', info_tooltips: 'Callback when open state changes.' },
      type: 'function',
      default: '--'
    },
    {
      prop: { name: 'placement', info_tooltips: 'Preferred placement of the popover.' },
      type: 'Placement',
      default: 'bottom'
    }
  ]
};

export default data;
