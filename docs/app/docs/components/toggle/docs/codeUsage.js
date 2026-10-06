import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import {
    createAriaReferenceRow,
    createAriaReferenceTable,
    DOCS_ARIA_PATTERNS
} from '../../shared/ariaReferences';
import {
    createKeyboardShortcutRow,
    createKeyboardShortcutTable,
    DOCS_KEYBOARD_SHORTCUTS
} from '../../shared/keyboardShortcuts';

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

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus to the toggle button.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SPACE,
        'Toggles the pressed state.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'Toggles the pressed state.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.BUTTON,
        'Uses button semantics with aria-pressed to expose the current on or off state.'
    )
]);

export default code;
