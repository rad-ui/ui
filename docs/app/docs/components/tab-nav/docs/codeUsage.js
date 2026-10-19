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
import root_api from './component_api/root.tsx';
import link_api from './component_api/link.tsx';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/tab-nav/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/tab-nav.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/tab-nav/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api,
    link: link_api
};

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus into or out of the navigation landmark. When a current link is set, focus enters on that link.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_RIGHT,
        'Moves focus to the next enabled link in horizontal orientation. In right-to-left direction, moves to the previous enabled link.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_LEFT,
        'Moves focus to the previous enabled link in horizontal orientation. In right-to-left direction, moves to the next enabled link.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_DOWN,
        'Moves focus to the next enabled link in vertical orientation.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_UP,
        'Moves focus to the previous enabled link in vertical orientation.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.HOME,
        'Moves focus to the first enabled link.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.END,
        'Moves focus to the last enabled link.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'Activates native anchors or button-like children rendered with asChild. The merged click handler updates the selected value when a value is provided.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SPACE,
        'Activates custom children that render a button-like element with asChild; anchors keep native browser link behavior.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.NAVIGATION_LANDMARK,
        'Root renders a native nav landmark. Provide aria-label or aria-labelledby when the page has more than one navigation region.'
    ),
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.LINK,
        'Links use native anchor semantics and expose the current route with aria-current="page". Without asChild, disabled links expose aria-disabled and remove href; with asChild, the child controls disabled semantics.'
    )
]);

export default code;
