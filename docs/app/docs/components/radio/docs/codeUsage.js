import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import radio_api from './component_api/radio.tsx';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/radio/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/radio.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/radio/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    radio: radio_api
};

export default code;
