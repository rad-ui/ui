import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root';
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

const example_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/form/docs/examples/FormExample.tsx');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/form/docs/anatomy.tsx');

const code = {
    javascript: {
        code: example_SourceCode
    }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api
};

export const features = [
    "Validates every Field on submit and focuses the first invalid one",
    "Uses the browser's constraint validation (required, type, pattern, min, max) plus each Field's validate function",
    "Maps server errors to fields by name and clears each one as the user edits it",
    "onFormSubmit receives the values as an object, with repeated names collected into arrays"
];

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        "Submits the form from a text control, which validates every field first."
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.TEXTBOX,
        "Each invalid control gets aria-invalid and its error in aria-describedby; the error is announced with role=\"alert\"."
    )
]);

export default code;
