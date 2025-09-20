import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import Kbd from '@radui/ui/Kbd';
import Text from '@radui/ui/Text';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/popover/docs/examples/popover_example1.tsx');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/popover/docs/anatomy.tsx');

import root_api_SourceCode from './component_api/root.tsx';
import trigger_api_SourceCode from './component_api/trigger.tsx';
import content_api_SourceCode from './component_api/content.tsx';
import arrow_api_SourceCode from './component_api/arrow.tsx';

const code = {
    javascript: {
        code: example_1_SourceCode
    },
    css: {
        code: `todo`
    }
};

export const anatomy = { code: anatomy_SourceCode };

const columns = [
    { name: 'Prop', id: 'prop' },
    { name: 'Type', id: 'type' },
    { name: 'Default', id: 'default' },
    { name: 'Description', id: 'description' }
];

export const api_documentation = {
    root: root_api_SourceCode,
    trigger: trigger_api_SourceCode,
    content: content_api_SourceCode,
    arrow: arrow_api_SourceCode
};

export const keyboardShortcuts = {
    columns: [
        { name: 'Shortcut', id: 'shortcut' },
        { name: 'Description', id: 'description' }
    ],
    data: [
        {
            shortcut: <Kbd>Escape</Kbd>,
            description: <Text>Closes the popover.</Text>,
            id: 'escape'
        }
    ]
};

export default code;
