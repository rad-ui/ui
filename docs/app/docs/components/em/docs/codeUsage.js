import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

// const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/em.scss');
const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/em/docs/EmExample.tsx');

// Import API documentation
import em_api_SourceCode from './api/em.tsx';

const code = {
    javascript: {
        code: example_1_SourceCode,
    },
    css: {
        code: `.rad-ui-em {
    font-style: italic;
}`
    },
}

// API documentation
export const api_documentation = {
    em: em_api_SourceCode
};

// Component features
export const features = [
    "Renders as semantic <em> HTML element",
    "Applies italic styling by default",
    "Maintains proper emphasis semantics for accessibility",
    "Customizable with className and style props"
];

export default code;