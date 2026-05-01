import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const scss_SourceCode = await getSourceCodeFromPath('src/components/ui/Em/em.clarity.scss');
const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/em/docs/EmExample.tsx');

// Import API documentation
import em_api_SourceCode from './component_api/em.tsx';

const code = {
    javascript: {
        code: example_1_SourceCode,
    },
    scss: {
        code: scss_SourceCode
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
