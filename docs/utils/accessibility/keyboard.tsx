import Kbd from '@radui/ui/Kbd';

export const ACCESSIBLE_KEYBOARD_KEYS = Object.freeze({
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_UP: 'ArrowUp',
    END: 'End',
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    HOME: 'Home',
    SHIFT_TAB: 'Shift + Tab',
    SPACE: 'Space',
    TAB: 'Tab'
});

export const KEYBOARD_SHORTCUT_COLUMNS = Object.freeze([
    {
        name: 'Shortcut',
        id: 'shortcut'
    },
    {
        name: 'Description',
        id: 'description'
    }
]);

export function renderKeyboardShortcut(shortcut: string | string[]) {
    const label = Array.isArray(shortcut) ? shortcut.join(' / ') : shortcut;

    return <Kbd>{label}</Kbd>;
}
