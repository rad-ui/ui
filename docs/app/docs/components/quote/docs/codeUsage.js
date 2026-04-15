import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import quote_api from './component_api/quote.tsx';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/quote/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/quote.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/quote/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    quote: quote_api
};

export default code;
