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

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/dialog/docs/example_1.tsx');

const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/dialog.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/dialog/docs/anatomy.tsx');

//

import root_api_SourceCode from './component_api/root.tsx';
import trigger_api_SourceCode from './component_api/trigger.tsx';
import title_api_SourceCode from './component_api/title.tsx';
import description_api_SourceCode from './component_api/description.tsx';
import portal_api_SourceCode from './component_api/portal.tsx';
import overlay_api_SourceCode from './component_api/overlay.tsx';
import content_api_SourceCode from './component_api/content.tsx';
import footer_api_SourceCode from './component_api/footer.tsx';
import close_api_SourceCode from './component_api/close.tsx';


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
    close: close_api_SourceCode,
}

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ESCAPE,
        'Closes the dialog when the close interaction is enabled.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus to the next focusable element inside the dialog.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SHIFT_TAB,
        'Moves focus to the previous focusable element inside the dialog.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.DIALOG_MODAL,
        'Uses modal dialog semantics with labelled content, description support, focus containment, and dismiss behavior.'
    )
]);

export default code
