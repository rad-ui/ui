import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/toggle-group/docs/examples/ToggleGroupExample.tsx');

const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/toggle-group.scss');


import root_api_SourceCode from "./component_api/root.tsx";
import item_api_SourceCode from "./component_api/item.tsx";


export const api_documentation = {
    root: root_api_SourceCode,
    item: item_api_SourceCode
};

const code = {
    javascript: {
        code: example_1_SourceCode,
    },
    css: {
        code: scss_SourceCode
    }
};

export default code;
