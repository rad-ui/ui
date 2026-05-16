import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root.tsx';
import item_api from './component_api/item.tsx';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/combobox/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/combobox.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/combobox/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api,
    item: item_api
};

export default code;
