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

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/menubar/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/menubar.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/menubar/docs/anatomy.tsx');

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
        DOCS_KEYBOARD_SHORTCUTS.ARROW_RIGHT,
        'Moves focus to the next top-level menu trigger. If a menu is open, the next menu opens.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_LEFT,
        'Moves focus to the previous top-level menu trigger. If a menu is open, the previous menu opens.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.HOME,
        'Moves focus to the first top-level menu trigger.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.END,
        'Moves focus to the last top-level menu trigger.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'Opens or closes the focused menu.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SPACE,
        'Opens or closes the focused menu.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_DOWN,
        'Opens the focused menu and moves focus into its items.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ESCAPE,
        'Closes the open menu and restores focus to its top-level trigger.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.MENUBAR,
        'The root uses role="menubar" with horizontal orientation. Triggers are menuitems with aria-haspopup="menu" and aria-expanded, and only the active trigger is in the tab order.'
    ),
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.MENU,
        'Uses menu semantics inside each opened menu for item navigation, submenu entry, and activation.'
    )
]);

export default code;
