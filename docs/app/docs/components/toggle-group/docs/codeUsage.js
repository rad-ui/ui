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

export default code;
