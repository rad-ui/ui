import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

// Import API documentation
import text_api_SourceCode from './component_api/text.tsx';

const scss_SourceCode = await getSourceCodeFromPath('src/components/ui/Text/text.clarity.scss');

const code = {
    javascript: {
        code: `import Text from "@radui/ui/Text"

const TextExample = () => (
    <div>
        <Text>Lorem ipsum</Text>
    </div>
)`
    },
    scss: {
        code: scss_SourceCode
    },
}

// API documentation
export const api_documentation = {
    text: text_api_SourceCode
};

// Component features
export const features = [
    "Renders as different HTML elements (p, span, div, label)",
    "Customizable with className and style props",
    "Preserves accessibility with proper semantic elements",
    "Lightweight and simple to use"
];

export default code; 
