import fs from 'fs';
import path from 'path';
import AccordionExample from './example_1';
import Kbd from '@radui/ui/Kbd';
import Text from '@radui/ui/Text';
import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/accordion/docs/example_1.tsx');
// console.log(example_1_SourceCode);


const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/accordion.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/accordion/docs/accordion_anatomy.tsx');

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
              When focus is on an Accordion.Trigger of a collapsed section, expands the section.
            </Text>
        },
        {
          shortcut: <Kbd>Enter</Kbd>,
          description: <Text>
            When focus is on an Accordion.Trigger of an expanded section, collapses the section.
          </Text>
        },
        {
          shortcut: <Kbd>Tab</Kbd>,
          description: <Text>
            When focus is on an Accordion.Trigger of a collapsed section, focuses the next Accordion.Trigger.
          </Text>
        },
        {
          shortcut: <Kbd>Shift + Tab</Kbd>,
          description: <Text>
            When focus is on an Accordion.Trigger of an expanded section, focuses the previous Accordion.Trigger.
          </Text>
        },
        {
          shortcut: <Kbd>ArrowDown</Kbd>,
          description: <Text>
            When focus is on an Accordion.Trigger of a collapsed section, focuses the next Accordion.Trigger.
          </Text>
        },
        {
          shortcut: <Kbd>ArrowUp</Kbd>,
          description: <Text>
            When focus is on an Accordion.Trigger of an expanded section, focuses the previous Accordion.Trigger.
          </Text>
        },
        // {
        //   shortcut: <Kbd>ArrowRight</Kbd>,
        //   description: <Text>
        //     When focus is on an Accordion.Trigger of a collapsed section, focuses the next Accordion.Trigger.
        //   </Text>
        // },
        // {
        //   shortcut: <Kbd>ArrowLeft</Kbd>,
        //   description: <Text>
        //     When focus is on an Accordion.Trigger of an expanded section, focuses the previous Accordion.Trigger.
        //   </Text>
        // }
        {
          shortcut: <Kbd>Home</Kbd>,
          description: <Text>
            When focus is on an Accordion.Trigger, focuses the first Accordion.Trigger. [TODO]
          </Text>
        },
        {
          shortcut: <Kbd>End</Kbd>,
          description: <Text>
            When focus is on an Accordion.Trigger, focuses the last Accordion.Trigger. [TODO]
          </Text>
        }
    ]
}

export default code