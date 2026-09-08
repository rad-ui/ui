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

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/switch/docs/examples/SwitchExample.tsx');

const scss_SourceCode = await getSourceCodeFromPath('src/components/ui/Switch/switch.clarity.scss');


import root_api_SourceCode from "./component_api/root.tsx";
import thumb_api_SourceCode from "./component_api/thumb.tsx";


export const api_documentation = {
    root: root_api_SourceCode,
    thumb: thumb_api_SourceCode
};


const code = {
    javascript: {
        code: example_1_SourceCode
    },
    scss: {
        code: scss_SourceCode
    }
};


export const SwitchTable = {
    columns: [
        {name: 'Prop', id: 'prop'},
        {name: 'Type', id: 'type'},
        {name: 'Default', id: 'default'},
        {name: 'Description', id: 'description'},
    ],
    data: [
        {prop: 'color', type: 'string', default: 'null', description: 'Accent Color of the switch', id: 'color'},
    ]
};

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus to the switch.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SPACE,
        'Toggles the checked state.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'Toggles the checked state.'
    )
]);

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.SWITCH,
        'Uses switch semantics with aria-checked to expose the current on or off state.'
    )
]);

export default code;
