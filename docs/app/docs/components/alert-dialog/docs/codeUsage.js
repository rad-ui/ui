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

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/alert-dialog/docs/example_1.tsx');

const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/alert-dialog.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/alert-dialog/docs/anatomy.tsx');

//

import root_api_SourceCode from './component_api/root.tsx';
import trigger_api_SourceCode from './component_api/trigger.tsx';
import title_api_SourceCode from './component_api/title.tsx';
import description_api_SourceCode from './component_api/description.tsx';
import portal_api_SourceCode from './component_api/portal.tsx';
import overlay_api_SourceCode from './component_api/overlay.tsx';
import content_api_SourceCode from './component_api/content.tsx';
import footer_api_SourceCode from './component_api/footer.tsx';
import cancel_api_SourceCode from './component_api/cancel.tsx';
import action_api_SourceCode from './component_api/action.tsx';
export const code = {
    javascript: {
        code: example_1_SourceCode
    },
    scss: {
        code: scss_SourceCode
    }
};

export const anatomy = {
    code: anatomy_SourceCode
}

export const api_documentation = {
    root: root_api_SourceCode,
    trigger: trigger_api_SourceCode,
    title: title_api_SourceCode,
    description: description_api_SourceCode,
    portal: portal_api_SourceCode,
    overlay: overlay_api_SourceCode,
    content: content_api_SourceCode,
    footer: footer_api_SourceCode,
    cancel: cancel_api_SourceCode,
    action: action_api_SourceCode
}

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ESCAPE,
        'Closes the alert dialog when cancel or dismiss behavior is available.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus to the next focusable control inside the alert dialog.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SHIFT_TAB,
        'Moves focus to the previous focusable control inside the alert dialog.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.ALERT_DIALOG,
        'Uses alert dialog semantics for confirmation flows that interrupt the current task and require a response.'
    ),
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.DIALOG_MODAL,
        'Inherits modal dialog focus containment, labelling, description, and focus restoration expectations.'
    )
]);

export default code
