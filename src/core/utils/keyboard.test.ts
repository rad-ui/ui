import { isActivationKey, isContextMenuKey, KEYBOARD_KEYS } from './keyboard';

describe('keyboard utils', () => {
    test('exports stable keyboard key values', () => {
        expect(KEYBOARD_KEYS.ENTER).toBe('Enter');
        expect(KEYBOARD_KEYS.SPACE).toBe(' ');
        expect(KEYBOARD_KEYS.ESCAPE).toBe('Escape');
        expect(KEYBOARD_KEYS.ARROW_DOWN).toBe('ArrowDown');
    });

    test('recognizes activation keys', () => {
        expect(isActivationKey(KEYBOARD_KEYS.ENTER)).toBe(true);
        expect(isActivationKey(KEYBOARD_KEYS.SPACE)).toBe(true);
        expect(isActivationKey(KEYBOARD_KEYS.TAB)).toBe(false);
    });

    test('recognizes context menu keys', () => {
        expect(isContextMenuKey(KEYBOARD_KEYS.CONTEXT_MENU)).toBe(true);
        expect(isContextMenuKey(KEYBOARD_KEYS.F10, true)).toBe(true);
        expect(isContextMenuKey(KEYBOARD_KEYS.F10, false)).toBe(false);
    });
});
