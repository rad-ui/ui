import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import slot_api from './component_api/slot';
import merge_props_api from './component_api/merge_props';
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

const example_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/slot/docs/examples/SlotExample.tsx');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/slot/docs/anatomy.tsx');

const code = {
    javascript: {
        code: example_SourceCode
    }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    slot: slot_api,
    merge_props: merge_props_api
};

export const features = [
    "Slot gives your components the asChild behavior Rad UI parts use",
    "mergeProps joins classes, merges styles and chains event handlers",
    "composeRefs combines callback and object refs",
    "Works with forwarded refs, so focus and measuring keep working"
];

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.NONE,
        "These utilities add no keyboard behavior; the rendered element keeps its own."
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.BUTTON,
        "Slot keeps the child's semantics; merge onto a native button or link to keep keyboard and screen reader support."
    )
]);

export default code;
