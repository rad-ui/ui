import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root.tsx';
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

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/checkbox-group/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/checkbox-group.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/checkbox-group/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api
};

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus into or out of the checkbox group.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_RIGHT,
        'Moves focus to the next enabled checkbox item when the group orientation allows horizontal navigation.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_DOWN,
        'Moves focus to the next enabled checkbox item when the group orientation allows vertical navigation.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_LEFT,
        'Moves focus to the previous enabled checkbox item when the group orientation allows horizontal navigation.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_UP,
        'Moves focus to the previous enabled checkbox item when the group orientation allows vertical navigation.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.HOME,
        'Moves focus to the first enabled checkbox item.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.END,
        'Moves focus to the last enabled checkbox item.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SPACE,
        'Toggles the focused checkbox item between checked and unchecked states.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.CHECKBOX,
        'Each item uses checkbox semantics with aria-checked, aria-required, and aria-disabled state exposed on the focusable trigger.'
    )
]);

export default code;
