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

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/tabs/docs/example_1.tsx');

const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/tabs.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/tabs/docs/anatomy.tsx');

//

import root_api_SourceCode from './component_api/root.tsx';
import trigger_api_SourceCode from './component_api/trigger.tsx';
import list_api_SourceCode from './component_api/list.tsx';
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
    trigger: trigger_api_SourceCode,
    list: list_api_SourceCode,
    content: content_api_SourceCode
}

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus into or out of the tab list.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_RIGHT,
        'When focus is on a tab trigger, moves focus to the next trigger.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_LEFT,
        'When focus is on a tab trigger, moves focus to the previous trigger.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.HOME,
        'When focus is on a tab trigger, moves focus to the first trigger.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.END,
        'When focus is on a tab trigger, moves focus to the last trigger.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.TABS,
        'Uses tab list, tab trigger, and tab panel semantics for switching between related views.'
    )
]);

export default code
