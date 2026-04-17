import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import link_api from './component_api/link.tsx';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/link/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/link.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/link/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    link: link_api
};

export default code;
