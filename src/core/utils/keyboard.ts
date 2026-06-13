export const KEYBOARD_KEYS = Object.freeze({
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_UP: 'ArrowUp',
    CONTEXT_MENU: 'ContextMenu',
    END: 'End',
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    F10: 'F10',
    HOME: 'Home',
    PAGE_DOWN: 'PageDown',
    PAGE_UP: 'PageUp',
    SPACE: ' ',
    TAB: 'Tab',
} as const);

export function isActivationKey(key: string) {
    return key === KEYBOARD_KEYS.ENTER || key === KEYBOARD_KEYS.SPACE;
}

export function isContextMenuKey(key: string, shiftKey = false) {
    return key === KEYBOARD_KEYS.CONTEXT_MENU || (shiftKey && key === KEYBOARD_KEYS.F10);
}
