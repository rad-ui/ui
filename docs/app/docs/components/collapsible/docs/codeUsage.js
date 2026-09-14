import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root.tsx';
import trigger_api from './component_api/trigger.tsx';
import content_api from './component_api/content.tsx';
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

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/collapsible/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/collapsible.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/collapsible/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api,
    trigger: trigger_api,
    content: content_api
};

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus to the Collapsible.Trigger.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SPACE,
        'Toggles the controlled content open or closed.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'Toggles the controlled content open or closed.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ESCAPE,
        'When the content is open and focus is on the trigger, closes the content.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.DISCLOSURE,
        'Uses a button trigger with aria-expanded and aria-controls to expose the content relationship.'
    )
]);

export default code;
