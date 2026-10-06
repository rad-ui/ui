import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

// Import API documentation
import button_api_SourceCode from './component_api/button.tsx';
import { ArrowRight } from 'lucide-react';
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

const scss_SourceCode = await getSourceCodeFromPath('src/components/ui/Button/button.clarity.scss');

const code = {
    javascript: {
        code: `import Button from "@radui/ui/Button"

const ButtonExample = () => (
    <div>
        <Button color="green">Click Me!</Button>
    </div>
)`
    },
    scss: {
        code: scss_SourceCode
    },
}

export const Arrow = () => {
    return <ArrowRight size={15} strokeWidth={2} />;
};

// API documentation
export const api_documentation = {
    button: button_api_SourceCode
};

// Component features
export const features = [
    "Multiple style variants: solid, soft, outline, ghost",
    "Different size options for various contexts",
    "Customizable with different color themes",
    "Support for icons and text content",
    "Follows accessibility best practices",
    "Can be used as buttons, links, or form submitters"
];

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus to the next focusable element in document focus order.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SPACE,
        'Activates the focused button.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'Activates the focused button.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.BUTTON,
        'Uses native button semantics by default, supports disabled state, and keeps activation behavior aligned with keyboard and pointer input.'
    )
]);

export default code;
