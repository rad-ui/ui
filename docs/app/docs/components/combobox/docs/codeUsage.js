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
import root_api from './component_api/root.tsx';
import item_api from './component_api/item.tsx';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/combobox/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/combobox.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/combobox/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api,
    item: item_api
};

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_DOWN,
        'Moves focus from the input into the popup, or to the next available option.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_UP,
        'Moves focus to the previous option while the popup is open.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'Accepts the highlighted option and updates the combobox value.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ESCAPE,
        'Closes the popup and keeps focus on the combobox input.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus out of the combobox using the normal page tab order.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.COMBOBOX,
        'Follows editable combobox guidance for an input with an associated popup of suggested values.'
    ),
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.LISTBOX,
        'Uses listbox option semantics for the popup collection and active option state.'
    )
]);

export default code;
