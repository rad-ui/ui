import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root.tsx';
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

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/number-field/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/number-field.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/number-field/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api
};

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus to the number input. Increment and decrement buttons are pointer controls and stay out of the tab order.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_UP,
        'Increments the current value by step when focus is on the input. Shift plus ArrowUp uses largeStep.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ARROW_DOWN,
        'Decrements the current value by step when focus is on the input. Shift plus ArrowDown uses largeStep.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.SPINBUTTON,
        'Uses the native number input spinbutton behavior. name, required, disabled, and readOnly are forwarded to the input, while min and max constrain typed and stepped values.'
    )
]);

export default code;
