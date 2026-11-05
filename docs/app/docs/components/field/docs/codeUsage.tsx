import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root';
import label_api from './component_api/label';
import control_api from './component_api/control';
import description_api from './component_api/description';
import error_api from './component_api/error_part';
import validity_api from './component_api/validity';
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

const example_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/field/docs/examples/FieldExample.tsx');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/field/docs/anatomy.tsx');

const code = {
    javascript: {
        code: example_SourceCode
    }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api,
    label: label_api,
    control: control_api,
    description: description_api,
    error: error_api,
    validity: validity_api
};

export const features = [
    "Links the label, help text and error to the control without hand-written ids",
    "Sets aria-invalid and announces the error only while the field is invalid",
    "Works with TextField, TextArea, native inputs or your own control through asChild",
    "Checkbox, Switch, Select and NumberField join the field directly, without Field.Control",
    "Validates with the browser's own checks plus your validate function, showing results on submit, blur or change",
    "Field.Error match gives each problem its own message, such as valueMissing or typeMismatch",
    "Exposes data-invalid, data-disabled, data-required, data-focused, data-touched and data-dirty on every part"
];

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus to the control. Field adds no key handling of its own; the control keeps its native behavior.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.TEXTBOX,
        'The label names the control; help text and the error message form its accessible description through aria-describedby.'
    ),
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.LIVE_REGION,
        'The error uses role="alert" so it is announced when it appears.'
    )
]);

export default code;
