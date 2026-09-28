import root_api_SourceCode from './component_api/root.tsx';
import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
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

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/live-region/docs/examples/LiveRegionExample.tsx');

const code = {
    javascript: {
        code: example_1_SourceCode
    }
};

export const api_documentation = {
    root: root_api_SourceCode
};

export const features = [
    "Polite and assertive announcement modes",
    "Visually hidden by default without removing content from the accessibility tree",
    "Configurable live region role and ARIA announcement metadata",
    "Stable data-slot and optional Theme class namespace hooks"
];

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'The visually hidden region is not tabbable. Tab moves focus to the next tabbable element, and updating the region does not move focus to it.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.LIVE_REGION,
        'Uses aria-live, aria-atomic, aria-relevant, and aria-busy to describe how assistive technologies should announce dynamic updates. The default role is status for polite updates and alert for assertive updates.'
    )
]);

export default code;
