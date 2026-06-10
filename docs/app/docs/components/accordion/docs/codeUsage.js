import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import {
    createKeyboardShortcutRow,
    createKeyboardShortcutTable,
    DOCS_KEYBOARD_SHORTCUTS
} from '../../shared/keyboardShortcuts';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/accordion/docs/example_1.tsx');

const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/accordion.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/accordion/docs/anatomy.tsx');

//

import root_api_SourceCode from './component_api/root.tsx';
import item_api_SourceCode from './component_api/item.tsx';
import header_api_SourceCode from './component_api/header.tsx';
import trigger_api_SourceCode from './component_api/trigger.tsx';
import content_api_SourceCode from './component_api/content.tsx';

export const code = {
    javascript: {
        code: example_1_SourceCode
    },
    scss: {
        code: scss_SourceCode
    }
};

export const anatomy = {
    code: anatomy_SourceCode
}

export const api_documentation = {
    root: root_api_SourceCode,
    item: item_api_SourceCode,
    header: header_api_SourceCode,
    trigger: trigger_api_SourceCode,
    content: content_api_SourceCode
}

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SPACE,
        'When focus is on an Accordion.Trigger of a collapsed section, expands the section.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'When focus is on an Accordion.Trigger of an expanded section, collapses the section.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'When focus is on an Accordion.Trigger of a collapsed section, focuses the next Accordion.Trigger.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SHIFT_TAB,
        'When focus is on an Accordion.Trigger of an expanded section, focuses the previous Accordion.Trigger.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_DOWN,
        'When focus is on an Accordion.Trigger of a collapsed section, focuses the next Accordion.Trigger.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_UP,
        'When focus is on an Accordion.Trigger of an expanded section, focuses the previous Accordion.Trigger.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.HOME,
        'When focus is on an Accordion.Trigger, focuses the first Accordion.Trigger.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.END,
        'When focus is on an Accordion.Trigger, focuses the last Accordion.Trigger.'
    )
]);

export default code
