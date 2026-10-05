import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api_SourceCode from './component_api/root.tsx';
import parts_api_SourceCode from './component_api/parts.tsx';
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

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/breadcrumb/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('src/components/ui/Breadcrumb/breadcrumb.clarity.scss');

const code = {
    javascript: {
        code: example_1_SourceCode
    },
    scss: {
        code: scss_SourceCode
    },
}

export const api_documentation = {
    root: root_api_SourceCode,
    parts: parts_api_SourceCode
};

export const features = [
    "Uses native nav and ordered-list semantics",
    "Marks the current page with aria-current by default",
    "Supports router links through Breadcrumb.Link asChild",
    "Exposes stable classes for each part",
    "Allows custom separator content"
];

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus between breadcrumb links in document order.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'Activates the focused breadcrumb link.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.BREADCRUMB,
        'Uses navigation landmark semantics, list structure, and aria-current on the current page link or item.'
    )
]);

export default code;
