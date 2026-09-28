import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root.tsx';
import input_api from './component_api/input.tsx';
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

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/text-area/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/textarea.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/text-area/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api,
    input: input_api
};

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus to and from the textarea using the browser focus order.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SHIFT_TAB,
        'Moves focus to the previous focusable element using the browser focus order.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'Inserts a line break while focus is inside the textarea.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.TEXTBOX,
        'Uses the native textarea element, which exposes a multiline textbox to assistive technology. The TextArea wrapper forwards disabled and placeholder, and maps readonly to readOnly; pass required, name, and other native form props to TextArea.Input when composing.'
    )
]);

export default code;
