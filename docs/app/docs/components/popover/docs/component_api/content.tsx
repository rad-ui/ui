const data = {
  name: 'Content',
  description: 'The popup content.',
  columns: [
    { name: 'Prop', id: 'prop' },
    { name: 'Type', id: 'type' },
    { name: 'Default', id: 'default' }
  ],
  data: [
    {
      prop: { name: 'portalled', info_tooltips: 'Render inside a portal.' },
      type: 'boolean',
      default: 'true'
    }
  ]
};

export default data;
