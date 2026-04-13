import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root.tsx';
import input_api from './component_api/input.tsx';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/text-area/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/textarea.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/text-area/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api,
    input: input_api
};

export default code;
