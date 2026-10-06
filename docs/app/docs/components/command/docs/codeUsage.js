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
import dialog_api from './component_api/dialog.tsx';
import item_api from './component_api/item.tsx';

const exampleSourceCode = await getSourceCodeFromPath('docs/app/docs/components/command/docs/example_1.tsx');
const anatomySourceCode = await getSourceCodeFromPath('docs/app/docs/components/command/docs/anatomy.tsx');
const scssSourceCode = await getSourceCodeFromPath('src/components/ui/Command/command.clarity.scss');

export const code = {
    javascript: { code: exampleSourceCode },
    scss: { code: scssSourceCode }
};

export const anatomy = { code: anatomySourceCode };

export const api_documentation = {
    root: root_api,
    dialog: dialog_api,
    item: item_api
};

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_DOWN,
        'Moves the active selection to the next available command item.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_UP,
        'Moves the active selection to the previous available command item.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.HOME,
        'Moves the active selection to the first available command item.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.END,
        'Moves the active selection to the last available command item.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'Runs the active command from the input, or the focused command item from the list.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SPACE,
        'Runs the focused command item when focus is inside the list.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ESCAPE,
        'Closes the command palette when it is rendered with Command.Dialog.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus through or out of the command palette using the normal page tab order.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.COMBOBOX,
        'Uses editable combobox semantics for the search input that controls the command results.'
    ),
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.LISTBOX,
        'Uses listbox option semantics for selectable command results and active item state.'
    ),
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.DIALOG_MODAL,
        'Uses modal dialog semantics when Command.Dialog presents the palette in a portal.'
    )
]);
