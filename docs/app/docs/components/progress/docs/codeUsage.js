// Import API documentation
import root_api_SourceCode from './component_api/root.tsx';
import indicator_api_SourceCode from './component_api/indicator.tsx';
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

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/progress/docs/examples/ProgressExample.tsx');

const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/progress.scss');


const code = {
    javascript: {
        code: example_1_SourceCode

    },
    css: {
        code: scss_SourceCode
    }

};

// API documentation
export const api_documentation = {
    root: root_api_SourceCode,
    indicator: indicator_api_SourceCode
};

// Component features
export const features = [
    "Displays completion status visually as a horizontal bar",
    "Supports minimum and maximum value configuration",
    "Customizable color themes",
    "Smooth animations for value changes"
];

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus to interactive controls associated with the progress indicator.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.PROGRESSBAR,
        'Uses progressbar semantics with aria-valuenow for determinate progress. aria-valuemin and aria-valuemax are optional for the default 0 to 100 range, aria-valuetext is only needed when the numeric value is not meaningful on its own, and indeterminate progress omits aria-valuenow.'
    )
]);

export default code;
