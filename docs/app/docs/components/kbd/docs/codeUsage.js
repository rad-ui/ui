// Import API documentation
import kbd_api_SourceCode from './component_api/kbd.tsx';

const code = {
    javascript: {
        code: `import Kbd from "@radui/ui/Kbd";

const KbdExample = () => (
  <Kbd>Ctrl + C</Kbd>
)
`
    },
    css: {
        code: `.rad-ui-kbd{
    user-select: none;
    font-weight: 400;
    font-family: inherit;
    background-color: var(--rad-ui-color-gray-50);
    color: var(--rad-ui-color-gray-950);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    border-radius: 4px;
    border: 1px solid var(--rad-ui-color-gray-500);
    box-shadow:  0px 0px 3px 1px var(--rad-ui-color-gray-400);
    padding: 4px 8px;
}`
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
