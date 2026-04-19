import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root.tsx';
import item_api from './component_api/item.tsx';
import label_api from './component_api/label.tsx';
import value_api from './component_api/value.tsx';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/data-list/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/data-list.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/data-list/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api,
    item: item_api,
    label: label_api,
    value: value_api
};

export default code;
