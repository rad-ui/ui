import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import {
    createKeyboardShortcutRow,
    createKeyboardShortcutTable,
    DOCS_KEYBOARD_SHORTCUTS
} from '../../shared/keyboardShortcuts';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/tooltip/docs/examples/tooltip_example1.tsx');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/tooltip/docs/anatomy.tsx');

// Import API documentation
import root_api_SourceCode from './component_api/root.tsx';
import trigger_api_SourceCode from './component_api/trigger.tsx';
import content_api_SourceCode from './component_api/content.tsx';

const code = {
    javascript: {
        code: example_1_SourceCode
    },
    css: {
        code: `todo`
    },
}

// Component anatomy for documentation
export const anatomy = {
    code: anatomy_SourceCode
};

// Columns for all tables
const columns = [
    {name: 'Prop', id: 'prop'},
    {name: 'Type', id: 'type'},
    {name: 'Default', id: 'default'},
    {name: 'Description', id: 'description'},
];

// API documentation
export const api_documentation = {
    root: root_api_SourceCode,
    trigger: trigger_api_SourceCode,
    content: content_api_SourceCode
};

// Keyboard shortcuts
export const keyboardShortcuts = {
    ...createKeyboardShortcutTable([
        createKeyboardShortcutRow(
            DOCS_KEYBOARD_SHORTCUTS.TAB,
            'Moves focus to the trigger element.'
        ),
        createKeyboardShortcutRow(
            DOCS_KEYBOARD_SHORTCUTS.SPACE,
            'When focus is on the trigger, toggles the tooltip.'
        ),
        createKeyboardShortcutRow(
            DOCS_KEYBOARD_SHORTCUTS.ENTER,
            'When focus is on the trigger, toggles the tooltip.'
        ),
        createKeyboardShortcutRow(
            DOCS_KEYBOARD_SHORTCUTS.ESCAPE,
            'Dismisses an open tooltip.'
        )
    ])
};

// Legacy table export - keeping for backward compatibility
export const TooltipTable = {
    columns: [
        {name: 'Prop', id: 'prop'},
        {name: 'Type', id: 'type'},
        {name: 'Default', id: 'default'},
        {name: 'Description', id: 'description'},
    ],
    data: [
        {prop: 'content', type: 'string', default: 'null', description: 'content/text on hover', id: 'src'},
    ]
};

export default code;
