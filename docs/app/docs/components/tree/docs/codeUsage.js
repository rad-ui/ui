import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root.tsx';
import item_api from './component_api/item.tsx';
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

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/tree/docs/example_1.tsx');
const largeData_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/tree/docs/large-data.tsx');
const scss_SourceCode = await getSourceCodeFromPath('src/components/ui/Tree/tree.clarity.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/tree/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const largeDataCode = {
    javascript: { code: largeData_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api,
    item: item_api
};

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus into the tree and onto the current roving tree item.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_DOWN,
        'Moves focus to the next visible tree item. With loop enabled, focus wraps from the last visible item to the first.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_UP,
        'Moves focus to the previous visible tree item. With loop enabled, focus wraps from the first visible item to the last.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_RIGHT,
        'Expands a collapsed parent item. When the parent is already expanded, moves focus to its first child.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_LEFT,
        'Collapses an expanded parent item. From a collapsed child or leaf item, moves focus back to the parent item.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.HOME,
        'Moves focus to the first visible tree item.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.END,
        'Moves focus to the last visible tree item.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'Runs onToggleSelect for the focused item when selection is controlled by the consumer.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.TREE_VIEW,
        'Tree.Root renders role="tree"; each Tree.Item renders role="treeitem", parent branches render role="group", expandable parents expose aria-expanded, and consumer-managed selection is reflected with aria-selected.'
    )
]);

export default code;
