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
import checkbox_item_api from './component_api/checkbox_item.tsx';
import radio_group_api from './component_api/radio_group.tsx';
import radio_item_api from './component_api/radio_item.tsx';
import item_indicator_api from './component_api/item_indicator.tsx';
import group_api from './component_api/group.tsx';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/dropdown-menu/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/dropdown-menu.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/dropdown-menu/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api,
    item: item_api,
    checkbox_item: checkbox_item_api,
    radio_group: radio_group_api,
    radio_item: radio_item_api,
    item_indicator: item_indicator_api,
    group: group_api
};

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'Opens the menu from the trigger, or activates the focused menu item.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SPACE,
        'Opens the menu from the trigger, or activates the focused menu item.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_DOWN,
        'Opens the menu and moves focus to the first item, or advances to the next item.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_UP,
        'Moves focus to the previous item while the menu is open.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ESCAPE,
        'Closes the menu and returns focus to the trigger.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.MENU_BUTTON,
        'Follows menu button guidance for a button-triggered menu, popup state, keyboard opening, item navigation, and dismissal.'
    )
]);

export default code;
