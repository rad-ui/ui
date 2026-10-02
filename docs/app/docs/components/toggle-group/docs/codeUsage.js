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

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/toggle-group/docs/examples/ToggleGroupExample.tsx');

const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/toggle-group.scss');


import root_api_SourceCode from "./component_api/root.tsx";
import item_api_SourceCode from "./component_api/item.tsx";


export const api_documentation = {
    root: root_api_SourceCode,
    item: item_api_SourceCode
};

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus into or out of the toggle group.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_RIGHT,
        'Moves focus to the next enabled item when orientation is horizontal.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_DOWN,
        'Moves focus to the next enabled item when orientation is vertical.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_LEFT,
        'Moves focus to the previous enabled item when orientation is horizontal.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_UP,
        'Moves focus to the previous enabled item when orientation is vertical.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.HOME,
        'Moves focus to the first enabled item.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.END,
        'Moves focus to the last enabled item.'
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
        'Each item follows toggle button semantics with aria-pressed for the selected state.'
    )
]);

const code = {
    javascript: {
        code: example_1_SourceCode,
    },
    css: {
        code: scss_SourceCode
    }
};

export default code;
