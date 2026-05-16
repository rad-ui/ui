import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import theme_api from './component_api/theme.tsx';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/theme/docs/example_1.tsx');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/theme/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    theme: theme_api
};

export default code;
