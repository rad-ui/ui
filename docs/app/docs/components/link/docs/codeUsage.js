import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import link_api from './component_api/link.tsx';
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

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/link/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/link.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/link/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    link: link_api
};

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus to the next focusable element in document focus order.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'Activates the focused link and follows its href.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.LINK,
        'Uses native anchor semantics by default, with href carrying the destination and Enter providing keyboard activation.'
    )
]);

export default code;
