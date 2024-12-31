import Kbd from '@radui/ui/Kbd';
import Text from '@radui/ui/Text';
import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const example_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/disclosure/docs/example.tsx');

const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/disclosure.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/disclosure/docs/disclosure_anatomy.tsx');

export const code = {
    javascript: {
        code: example_SourceCode
    },
    scss: {
        code: scss_SourceCode
    }
};

export const anatomy = {
    code: anatomy_SourceCode
}

export const keyboardShortcuts = {
    columns: [
        {
            name: 'Shortcut',
            key: 'shortcut'
        },
        {
            name: 'Description',
            key: 'description'
        }
    ],
    data: [
        {
            shortcut: <Kbd>Space</Kbd>,
            description: <Text>
              When focus is on Disclosure.Trigger of a collapsed section, expands the section.
            </Text>
        },
        {
          shortcut: <Kbd>Enter</Kbd>,
          description: <Text>
            When focus is on Disclosure.Trigger of an expanded section, collapses the section.
          </Text>
        },
        {
          shortcut: <Kbd>Tab</Kbd>,
          description: <Text>
            When focus is on Disclosure.Trigger of a collapsed section, focuses the next Disclosure Trigger.
          </Text>
        },
        {
          shortcut: <Kbd>Shift + Tab</Kbd>,
          description: <Text>
            When focus is on Disclosure.Trigger of an expanded section, focuses the previous Disclosure Trigger.
          </Text>
        },
        {
          shortcut: <Kbd>ArrowDown</Kbd>,
          description: <Text>
            When focus is on Disclosure.Trigger of a collapsed section, focuses the next Disclosure.Trigger.
          </Text>
        },
        {
          shortcut: <Kbd>ArrowUp</Kbd>,
          description: <Text>
            When focus is on Disclosure.Trigger of an expanded section, focuses the previous Disclosure.Trigger.
          </Text>
        },
        
    ]
}

export default code