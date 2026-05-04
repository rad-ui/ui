import Text from '@radui/ui/Text';
import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import {
    ACCESSIBLE_KEYBOARD_KEYS,
    KEYBOARD_SHORTCUT_COLUMNS,
    renderKeyboardShortcut
} from '@/utils/accessibility/keyboard';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/accordion/docs/example_1.tsx');

const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/accordion.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/accordion/docs/anatomy.tsx');

//

import root_api_SourceCode from './component_api/root.tsx';
import item_api_SourceCode from './component_api/item.tsx';
import header_api_SourceCode from './component_api/header.tsx';
import trigger_api_SourceCode from './component_api/trigger.tsx';
import content_api_SourceCode from './component_api/content.tsx';

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
    item: item_api_SourceCode,
    header: header_api_SourceCode,
    trigger: trigger_api_SourceCode,
    content: content_api_SourceCode
}

export const keyboardShortcuts = {
    columns: KEYBOARD_SHORTCUT_COLUMNS,
    data: [
        {
            shortcut: renderKeyboardShortcut(ACCESSIBLE_KEYBOARD_KEYS.SPACE),
            description: <Text>
              When focus is on an Accordion.Trigger of a collapsed section, expands the section.
            </Text>,
            id: "space"
        },
        {
          shortcut: renderKeyboardShortcut(ACCESSIBLE_KEYBOARD_KEYS.ENTER),
          description: <Text>
            When focus is on an Accordion.Trigger of an expanded section, collapses the section.
          </Text>,
          id: "enter"
        },
        {
          shortcut: renderKeyboardShortcut(ACCESSIBLE_KEYBOARD_KEYS.TAB),
          description: <Text>
            When focus is on an Accordion.Trigger of a collapsed section, focuses the next Accordion.Trigger.
          </Text>,
          id: "tab"
        },
        {
          shortcut: renderKeyboardShortcut(ACCESSIBLE_KEYBOARD_KEYS.SHIFT_TAB),
          description: <Text>
            When focus is on an Accordion.Trigger of an expanded section, focuses the previous Accordion.Trigger.
          </Text>,
          id: "shift-tab"
        },
        {
          shortcut: renderKeyboardShortcut(ACCESSIBLE_KEYBOARD_KEYS.ARROW_DOWN),
          description: <Text>
            When focus is on an Accordion.Trigger of a collapsed section, focuses the next Accordion.Trigger.
          </Text>,
          id: "arrow-down"
        },
        {
          shortcut: renderKeyboardShortcut(ACCESSIBLE_KEYBOARD_KEYS.ARROW_UP),
          description: <Text>
            When focus is on an Accordion.Trigger of an expanded section, focuses the previous Accordion.Trigger.
          </Text>,
          id:   "arrow-up"
        },
        // {
        //   shortcut: renderKeyboardShortcut(ACCESSIBLE_KEYBOARD_KEYS.ARROW_RIGHT),
        //   description: <Text>
        //     When focus is on an Accordion.Trigger of a collapsed section, focuses the next Accordion.Trigger.
        //   </Text>
        // },
        // {
        //   shortcut: renderKeyboardShortcut(ACCESSIBLE_KEYBOARD_KEYS.ARROW_LEFT),
        //   description: <Text>
        //     When focus is on an Accordion.Trigger of an expanded section, focuses the previous Accordion.Trigger.
        //   </Text>
        // }
        {
          shortcut: renderKeyboardShortcut(ACCESSIBLE_KEYBOARD_KEYS.HOME),
          description: <Text>
            When focus is on an Accordion.Trigger, focuses the first Accordion.Trigger. [TODO]
          </Text>,
          id: "home"
        },
        {
          shortcut: renderKeyboardShortcut(ACCESSIBLE_KEYBOARD_KEYS.END),
          description: <Text>
            When focus is on an Accordion.Trigger, focuses the last Accordion.Trigger. [TODO]
          </Text>,
          id: "end"
        }
    ]
}

export default code
