import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root.tsx';
import scrollbar_api from './component_api/scrollbar.tsx';
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

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/scroll-area/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/scroll-area.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/scroll-area/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const fullPageRestoration = {
    javascript: {
        code: `import { usePathname } from 'next/navigation';
import ScrollArea from '@radui/ui/ScrollArea';

export function PageScroller({ children }) {
    const pathname = usePathname();

    return (
        <ScrollArea.Root
            scrollRestoration="manual"
            restoreKey={pathname}
            style={{ height: '100%', width: '100%' }}
        >
            <ScrollArea.Viewport style={{ height: '100%' }}>
                {children}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="vertical">
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
        </ScrollArea.Root>
    );
}`
    }
};

export const api_documentation = {
    root: root_api,
    scrollbar: scrollbar_api
};

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus into and out of focusable content inside the viewport.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_UP,
        'Scrolls vertically when focus is inside the viewport and the focused element does not handle the key.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_DOWN,
        'Scrolls vertically when focus is inside the viewport and the focused element does not handle the key.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_LEFT,
        'Scrolls horizontally when focus is inside the viewport and the focused element does not handle the key.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_RIGHT,
        'Scrolls horizontally when focus is inside the viewport and the focused element does not handle the key.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.PAGE_UP,
        'Scrolls toward the start of the vertical viewport by a larger step.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.PAGE_DOWN,
        'Scrolls toward the end of the vertical viewport by a larger step.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.HOME,
        'Moves to the start of focused scrollable content when the browser provides native scroll handling.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.END,
        'Moves to the end of focused scrollable content when the browser provides native scroll handling.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.REGION,
        'ScrollArea does not add a widget role by default. Add role="region" with an accessible name only when the scrollable content should be exposed as a navigable landmark.'
    )
]);

export default code;
