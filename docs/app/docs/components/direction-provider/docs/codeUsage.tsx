import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import provider_api from './component_api/provider';
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

const example_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/direction-provider/docs/examples/DirectionProviderExample.tsx');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/direction-provider/docs/anatomy.tsx');

const code = {
    javascript: {
        code: example_SourceCode
    }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    provider: provider_api
};

export const features = [
    "One wrapper sets right-to-left keyboard navigation for every component inside",
    "Covers Tabs, TabNav, ToggleGroup, Toolbar, RadioGroup, CheckboxGroup, Accordion, menus, Menubar, NavigationMenu, Splitter, Slider, Select and Combobox",
    "A component's own dir prop still wins",
    "useDirection reads it in your own components"
];

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_LEFT,
        "In rtl, moves to the next item in horizontal components."
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_RIGHT,
        "In rtl, moves to the previous item in horizontal components."
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.TABS,
        "Horizontal arrow keys follow the reading direction, as the APG patterns require for right-to-left languages."
    )
]);

export default code;
