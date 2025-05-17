import Kbd from '@radui/ui/Kbd';
import Text from '@radui/ui/Text';
import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/alert-dialog/docs/example_1.tsx');

const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/alert-dialog.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/alert-dialog/docs/anatomy.tsx');

//

import root_api_SourceCode from './component_api/root.tsx';
import item_api_SourceCode from './component_api/item.tsx';
import trigger_api_SourceCode from './component_api/trigger.tsx';
import title_api_SourceCode from './component_api/title.tsx';

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
    trigger: trigger_api_SourceCode,
    title: title_api_SourceCode
}

export default code