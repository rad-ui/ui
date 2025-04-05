// Import API documentation
import card_api_SourceCode from './api/card.tsx';

const code = {
    javascript: {
        code: `import Card from "@radui/ui/Card"
        
const CardExample = () => (
    <Card>
        Hello Card content
    </Card>
)`
    },
    scss: {
        code: `.rad-ui-card{
    border: 1px solid var(--rad-ui-color-gray-400);
    padding: 12px;
    border-radius: 4px;
    box-shadow: 1px 1px 4px 1px var(--rad-ui-color-gray-200);
}`
    },
}

// API documentation
export const api_documentation = {
    card: card_api_SourceCode
};

// Component features
export const features = [
    "Provides a consistent container with proper spacing and borders",
    "Supports custom styling through className and customRootClass",
    "Can be customized with accent colors",
    "Works well with other components to create structured layouts"
];

export default code;