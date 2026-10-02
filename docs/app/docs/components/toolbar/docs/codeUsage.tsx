import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root';
import toggle_group_api from './component_api/toggleGroup';
import toggle_item_api from './component_api/toggleItem';
import button_api from './component_api/button';
import link_api from './component_api/link';
import separator_api from './component_api/separator';
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

const example_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/toolbar/docs/examples/ToolbarExample.tsx');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/toolbar/docs/anatomy.tsx');

const code = {
    javascript: {
        code: example_SourceCode
    }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api,
    toggleGroup: toggle_group_api,
    toggleItem: toggle_item_api,
    button: button_api,
    link: link_api,
    separator: separator_api
};

export const features = [
    "The whole toolbar is a single tab stop, with arrow keys moving between items",
    "Single or multiple selection toggle groups",
    "Separator orientation inferred from the toolbar's orientation",
    "Horizontal and vertical orientations"
];

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_RIGHT,
        'Moves focus to the next item in a horizontal toolbar.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_DOWN,
        'Moves focus to the next item in a vertical toolbar.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SPACE,
        'Toggles the focused item.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'Toggles the focused item.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.BUTTON,
        'Buttons and toggle items are native buttons. Toggle items expose their pressed state, and the toolbar carries an accessible name via aria-label.'
    )
]);

export default code
