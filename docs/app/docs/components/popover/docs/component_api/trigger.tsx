const data = {
  name: 'Trigger',
  description: 'Element that toggles the popover.',
  columns: [
    { name: 'Prop', id: 'prop' },
    { name: 'Type', id: 'type' },
    { name: 'Default', id: 'default' }
  ],
  data: [
    {
      prop: { name: 'asChild', info_tooltips: 'Render the trigger as child element.' },
      type: 'boolean',
      default: 'false'
    }
  ]
};

export default data;
