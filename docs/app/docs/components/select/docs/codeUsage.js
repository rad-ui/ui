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

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/select/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/select.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/select/docs/anatomy.tsx');

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
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'Opens the select when closed, or selects the highlighted item when the listbox is open.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SPACE,
        'Opens the select when closed, or selects the highlighted item when the listbox is open.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_DOWN,
        'Moves focus to the next item in the listbox.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_UP,
        'Moves focus to the previous item in the listbox.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ESCAPE,
        'Closes the listbox without changing the current value.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.COMBOBOX,
        'Uses select-only combobox semantics for a collapsed trigger with an associated single-selection popup.'
    ),
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.LISTBOX,
        'Follows listbox option semantics for the popup items and highlighted selection state.'
    )
]);

export default code;
