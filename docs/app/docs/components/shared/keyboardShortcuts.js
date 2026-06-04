import Kbd from '@radui/ui/Kbd';
import Text from '@radui/ui/Text';

export const keyboardShortcutColumns = [
    {
        name: 'Shortcut',
        id: 'shortcut'
    },
    {
        name: 'Description',
        id: 'description'
    }
];

export const DOCS_KEYBOARD_SHORTCUTS = Object.freeze({
    ARROW_DOWN: { id: 'arrow-down', label: 'ArrowDown' },
    ARROW_UP: { id: 'arrow-up', label: 'ArrowUp' },
    END: { id: 'end', label: 'End' },
    ENTER: { id: 'enter', label: 'Enter' },
    ESCAPE: { id: 'escape', label: 'Escape' },
    HOME: { id: 'home', label: 'Home' },
    SHIFT_TAB: { id: 'shift-tab', label: 'Shift + Tab' },
    SPACE: { id: 'space', label: 'Space' },
    TAB: { id: 'tab', label: 'Tab' }
});

export const createKeyboardShortcutRow = (shortcut, description) => {
    if (!shortcut || typeof shortcut !== 'object' || !shortcut.id || !shortcut.label) {
        throw new Error('createKeyboardShortcutRow: invalid shortcut; use a DOCS_KEYBOARD_SHORTCUTS value.');
    }

    return {
        shortcut: <Kbd>{shortcut.label}</Kbd>,
        description: <Text>{description}</Text>,
        id: shortcut.id
    };
};

export const createKeyboardShortcutTable = (rows = []) => ({
    columns: keyboardShortcutColumns,
    data: rows
});
