import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import {
    createKeyboardShortcutRow,
    createKeyboardShortcutTable,
    DOCS_KEYBOARD_SHORTCUTS
} from '../../shared/keyboardShortcuts';
import {
    createAriaReferenceRow,
    createAriaReferenceTable,
    DOCS_ARIA_PATTERNS
} from '../../shared/ariaReferences';
import root_api from './component_api/root.tsx';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/navigation-menu/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/navigation-menu.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/navigation-menu/docs/anatomy.tsx');

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
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'When focus is on a NavigationMenu.Trigger, toggles its content panel.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SPACE,
        'When focus is on a NavigationMenu.Trigger, toggles its content panel.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_RIGHT,
        'Moves focus to the next trigger or link, wrapping to the first when loop is enabled.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_LEFT,
        'Moves focus to the previous trigger or link, wrapping to the last when loop is enabled.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_DOWN,
        'On a NavigationMenu.Trigger, opens its panel (if closed) and moves focus to the first link. Inside an open panel, moves focus to the next link.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_UP,
        'Inside an open content panel, moves focus to the previous link.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.HOME,
        'Moves focus to the first trigger or link in the current group.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.END,
        'Moves focus to the last trigger or link in the current group.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ESCAPE,
        'Closes the open content panel and returns focus to its NavigationMenu.Trigger. Pressing outside the item also closes it.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus out of the current group to the next focusable element.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.DISCLOSURE,
        'Root renders a <nav> landmark (name it with aria-label). Triggers are buttons that expose aria-expanded and aria-controls for their content panel; links inside panels keep native link semantics.'
    )
]);

export default code;
