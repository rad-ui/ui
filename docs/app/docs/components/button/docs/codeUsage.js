import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

// Import API documentation
import button_api_SourceCode from './component_api/button.tsx';
import { ArrowRight } from 'lucide-react';

const scss_SourceCode = await getSourceCodeFromPath('src/components/ui/Button/button.clarity.scss');

const code = {
    javascript: {
        code: `import Button from "@radui/ui/Button"

const ButtonExample = () => (
    <div>
        <Button color="green">Click Me!</Button>
    </div>
)`
    },
    scss: {
        code: scss_SourceCode
    },
}

export const Arrow = () => {
    return <ArrowRight size={15} strokeWidth={2} />;
};

// API documentation
export const api_documentation = {
    button: button_api_SourceCode
};

// Component features
export const features = [
    "Multiple style variants: solid, soft, outline, ghost",
    "Different size options for various contexts",
    "Customizable with different color themes",
    "Support for icons and text content",
    "Follows accessibility best practices",
    "Can be used as buttons, links, or form submitters"
];

export default code;
