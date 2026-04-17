import Kbd from '@radui/ui/Kbd';
import Text from '@radui/ui/Text';
import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/tabs/docs/example_1.tsx');

const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/tabs.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/tabs/docs/anatomy.tsx');

//

import root_api_SourceCode from './component_api/root.tsx';
import trigger_api_SourceCode from './component_api/trigger.tsx';
import list_api_SourceCode from './component_api/list.tsx';
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
    trigger: trigger_api_SourceCode,
    list: list_api_SourceCode,
    content: content_api_SourceCode
}

export default code