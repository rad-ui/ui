import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import skeleton_api from './component_api/skeleton.tsx';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/skeleton/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/skeleton.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/skeleton/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    skeleton: skeleton_api
};

export default code;
