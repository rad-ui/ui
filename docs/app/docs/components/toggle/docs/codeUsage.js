import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const scss_SourceCode = await getSourceCodeFromPath('src/components/ui/Toggle/toggle.clarity.scss');

const code = {
    javascript: {
        code: `
import Toggle from "@radui/ui/Toggle";

const ToggleExample = () => {
  const [pressed, setPressed] = React.useState(false)

  const handleChange = (newPressed) => {
    setPressed(newPressed)
  }
  
  return (
    <Toggle pressed={pressed} onPressedChange={handleChange}>
      <Icon />
    </Toggle>
  )
}`
    },
    scss: {
        code: scss_SourceCode
    }
};


export const ToggleTable = {
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
