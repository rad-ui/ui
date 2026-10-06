import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import radio_api from './component_api/radio.tsx';
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

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/radio/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/radio.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/radio/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    radio: radio_api
};

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus to the radio input.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SPACE,
        'Checks the radio input when it is focused.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.RADIO_GROUP,
        'Uses native radio semantics for the individual option. Use RadioGroup when documenting grouped roving-focus behavior.'
    )
]);

export default code;
