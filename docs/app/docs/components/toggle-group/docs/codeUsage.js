const code = {
    javascript: {
        code: `
import ToggleGroup from "@radui/ui/ToggleGroup";

const items = [
  { label: <FrameIcon />, value: 'item1' },
  { label: <CropIcon />, value: 'item2' },
  { label: <LayersIcon />, value: 'item3' },
  { label: <ColumnsIcon />, value: 'item4' }
];

const ToggleGroupWrapper = () => {
  const handleChange = (newPressed) => {
    console.log(newPressed)
  }

  return (
    <ToggleGroup 
      defaultPressed={false} 
      onChange={handleChange} 
      type="multiple" 
      items={items}
    />
  )
}`
    },
    css: {
        code: `.rad-ui-toggle-group {

    display: inline-flex;
    gap:12px;
    

    button {
        all: unset;
        background-color: white;
        color: #65636d;
        height: 35px;
        width: 35px;
        display: flex;
        font-size: 15px;
        line-height: 1;
        align-items: center;
        justify-content: center;
        margin-left: 1px;
        border-radius: 4px;

        &:focus, &:active {
            outline: 2px solid var(--rad-ui-color-accent-900);
            outline-offset: 4px;
        }

        &[aria-pressed="true"] {
            background-color: var(--rad-ui-color-accent-900);
            color: white;
        }
    }
}`
    }
};


export const ToggleGroupTable = {
  columns: [
    {name: 'Prop', id: 'prop'},
    {name: 'Type', id: 'type'},
    {name: 'Default', id: 'default'},
    {name: 'Description', id: 'description'},
  ],
  data: [
    {prop: 'color', type: 'string', default: 'null', description: 'Accent Color of the toggled item', id: 'color'},
    // {prop: 'pressed', type: 'boolean', default: 'false', description: 'Accent Color of the toggled item', id: 'pressed'},
    // {prop: 'disabled', type: 'boolean', default: 'null', description: 'Accent Color of the toggled item', id: 'disabled'},
  ]
};


export default code;
