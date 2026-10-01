import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root';
import input_api from './component_api/input';
import slot_api from './component_api/slot';
import reset_api from './component_api/reset';
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

const example_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/text-field/docs/examples/TextFieldExample.tsx');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/text-field/docs/anatomy.tsx');

const code = {
    javascript: {
        code: example_SourceCode
    }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api,
    input: input_api,
    slot: slot_api,
    reset: reset_api
};

export const features = [
    "Composes a native input, so every native attribute and browser behaviour is available",
    "Leading and trailing slots that forward focus to the input when clicked",
    "Reset button that clears the value and returns focus, rendered only once there is a value",
    "Accepts a ref directly on the input"
];

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus into and out of the input.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'Submits the surrounding form when the input is inside one.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.TEXTBOX,
        'Uses the native textbox role. Associate a label element or aria-label — a placeholder is not an accessible name.'
    )
]);

export default code
