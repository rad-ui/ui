import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root';
import trigger_api from './component_api/trigger';
import portal_api from './component_api/portal';
import content_api from './component_api/content';
import close_api from './component_api/close';
import arrow_api from './component_api/arrow';
import anchor_api from './component_api/anchor';
import title_api from './component_api/title';
import description_api from './component_api/description';
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

const example_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/popover/docs/examples/PopoverExample.tsx');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/popover/docs/anatomy.tsx');

const code = {
    javascript: {
        code: example_SourceCode
    }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api,
    trigger: trigger_api,
    portal: portal_api,
    content: content_api,
    close: close_api,
    arrow: arrow_api,
    anchor: anchor_api,
    title: title_api,
    description: description_api
};

export const features = [
    "Positions against the trigger with viewport collision handling",
    "Escape, outside pointer press and outside focus all dismiss",
    "Controlled and uncontrolled open state via open, defaultOpen and onOpenChange",
    "Optional modal mode that traps focus while open",
    "Focus returns to the trigger when the popover closes"
];

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ESCAPE,
        'Closes the popover and returns focus to the trigger.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus to the next focusable element inside the popover content.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SHIFT_TAB,
        'Moves focus to the previous focusable element inside the popover content.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.DIALOG_MODAL,
        'Content uses dialog semantics with labelling, focus containment and dismiss behaviour.'
    )
]);

export default code