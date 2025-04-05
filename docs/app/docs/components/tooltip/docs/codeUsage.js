import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import Kbd from '@radui/ui/Kbd';
import Text from '@radui/ui/Text';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/tooltip/docs/examples/tooltip_example1.tsx');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/tooltip/docs/anatomy.tsx');

// Import API documentation
import root_api_SourceCode from './api/root.tsx';
import trigger_api_SourceCode from './api/trigger.tsx';
import content_api_SourceCode from './api/content.tsx';

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
    columns: [
        {
            name: 'Shortcut',
            id: 'shortcut'
        },
        {
            name: 'Description',
            id: 'description'
        }
    ],
    data: [
        {
            shortcut: <Kbd>Tab</Kbd>,
            description: <Text>
                Moves focus to the trigger element.
            </Text>,
            id: "tab"
        },
        {
            shortcut: <Kbd>Space</Kbd>,
            description: <Text>
                When focus is on the trigger, toggles the tooltip.
            </Text>,
            id: "space"
        },
        {
            shortcut: <Kbd>Enter</Kbd>,
            description: <Text>
                When focus is on the trigger, toggles the tooltip.
            </Text>,
            id: "enter"
        },
        {
            shortcut: <Kbd>Escape</Kbd>,
            description: <Text>
                Dismisses an open tooltip.
            </Text>,
            id: "escape"
        }
    ]
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
