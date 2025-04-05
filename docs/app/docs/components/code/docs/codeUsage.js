// Import API documentation
import code_api_SourceCode from './api/code.tsx';

const code = {
    javascript: {
        code: `import Code from "@radui/ui/Code"

const CodeExample = () => (
    <div>
        <Code>console.log('This is some code')</Code>
    </div>
)`
    },
    css: {
        code: `.rui-code-root{
    color: var(--rad-ui-color-accent-950);
    background-color: var(--rad-ui-color-accent-400);
    padding: 1px 10px; // Add space for readability
    display: inline-block;
    border-radius: 4px;
    font-size:12px;
}`
    },
}

// API documentation
export const api_documentation = {
    code: code_api_SourceCode
};

// Component features
export const features = [
    "Renders as semantic <code> HTML element",
    "Pre-styled for code snippets with proper font and background",
    "Supports custom colors and variants",
    "Helps maintain consistent code styling across your UI"
];

// Legacy table export - keeping for backward compatibility
export const CodeTable = {
    columns : [
        {name: 'Prop', id: 'prop'},
        {name: 'Type', id: 'type'},
        {name: 'Default', id: 'default'},
        {name: 'Description', id: 'description'},
    ],
    data : [
        {prop: 'color', type: 'string', default: 'null', description: 'Accent Color of the code', id: 'color'},
    ]
}

export default code; 