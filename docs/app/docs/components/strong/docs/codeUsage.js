// Import API documentation
import strong_api_SourceCode from './api/strong.tsx';

const code = {
    javascript: {
        code: `import Strong from '@radui/ui/Strong'

const StrongExample = () => (
    <div className='text-gray-1000'>
       <p>This is a <Strong>very important</Strong> message.</p>
    </div>
)`
    },
    css: {
        code: `.rad-ui-strong {
    font-weight: bold;
}`
    }
}

// API documentation
export const api_documentation = {
    strong: strong_api_SourceCode
};

// Component features
export const features = [
    "Renders as semantic <strong> HTML element",
    "Applies bold styling by default",
    "Maintains proper importance semantics for accessibility",
    "Customizable with className and style props",
    "Simple integration with text content"
];

export default code;