import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root';
import input_api from './component_api/input';
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

const example_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/otp-field/docs/examples/OTPFieldExample.tsx');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/otp-field/docs/anatomy.tsx');

const code = {
    javascript: {
        code: example_SourceCode
    }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api,
    input: input_api
};

export const features = [
    "Slots fill left to right; focusing past the first empty slot moves there",
    "Paste or SMS autofill spreads a full code across the slots",
    "Numeric, alphabetic or alphanumeric validation, and password masking",
    "Submits as one value through a hidden input, with optional auto-submit"
];

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_LEFT,
        "Moves to the previous slot."
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_RIGHT,
        "Moves to the next filled slot."
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.HOME,
        "Moves to the first slot."
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.END,
        "Moves to the last filled slot."
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        "Moves focus in and out of the slots."
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.TEXTBOX,
        "Each slot is a text input named \"Character n of length\" inside a labelled group."
    )
]);

export default code;
