import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root';
import legend_api from './component_api/legend';
import description_api from './component_api/description';
import message_api from './component_api/message';
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

const example_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/fieldset/docs/examples/FieldsetExample.tsx');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/fieldset/docs/anatomy.tsx');

const code = {
    javascript: {
        code: example_SourceCode
    }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api,
    legend: legend_api,
    description: description_api,
    message: message_api
};

export const features = [
    "Uses native fieldset and legend elements for grouped form controls",
    "Propagates disabled state through the browser's form semantics",
    "Provides description and validation message slots",
    "Exposes stable data-slot, data-disabled, and data-invalid hooks"
];

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus through enabled form controls inside the fieldset.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.FIELDSET,
        'Uses the native fieldset and legend relationship so assistive technology announces the group label with contained controls.'
    )
]);

export default code;
