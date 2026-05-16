import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import spinner_api from './component_api/spinner.tsx';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/spinner/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/spinner.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/spinner/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    spinner: spinner_api
};

export default code;
