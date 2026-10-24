import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root';
import input_api from './component_api/input';
import item_api from './component_api/item';
import empty_api from './component_api/empty';
import clear_api from './component_api/clear';
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

const example_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/autocomplete/docs/examples/AutocompleteExample.tsx');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/autocomplete/docs/anatomy.tsx');

const code = {
    javascript: {
        code: example_SourceCode
    }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api,
    input: input_api,
    item: item_api,
    empty: empty_api,
    clear: clear_api
};

export const features = [
    "Free-text value: suggestions help but don't restrict what can be typed",
    "Filters suggestions by what's typed and highlights the first match",
    "Focus stays in the input; options are reached with aria-activedescendant",
    "Enter or a click fills in the suggestion; Escape closes and keeps the text"
];

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_DOWN,
        "Opens the suggestions or moves to the next one."
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_UP,
        "Moves to the previous suggestion."
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        "Fills in the highlighted suggestion."
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ESCAPE,
        "Closes the suggestions and keeps the text."
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.COMBOBOX,
        "The input has role=\"combobox\" with aria-autocomplete=\"list\", aria-expanded and aria-activedescendant pointing at the highlighted option."
    )
]);

export default code;
