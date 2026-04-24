import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

// Import API documentation
import kbd_api_SourceCode from './component_api/kbd.tsx';

const scss_SourceCode = await getSourceCodeFromPath('src/components/ui/Kbd/kbd.clarity.scss');

const code = {
    javascript: {
        code: `import Kbd from "@radui/ui/Kbd";

const KbdExample = () => (
  <Kbd>Ctrl + C</Kbd>
)
`
    },
    scss: {
        code: scss_SourceCode
    }
};

// API documentation
export const api_documentation = {
    kbd: kbd_api_SourceCode
};

// Component features
export const features = [
    "Visual representation of keyboard keys and shortcuts",
    "Pre-styled with appropriate borders and shadows",
    "Customizable with size variants",
    "Maintains semantic meaning with proper <kbd> HTML element",
    "Ideal for documenting keyboard interactions and shortcuts"
];

export default code;
