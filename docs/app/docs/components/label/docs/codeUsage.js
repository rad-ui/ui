// Import API documentation
import label_api_SourceCode from './component_api/label.tsx';

const code = {
    javascript: {
        code: `import Label from "@radui/ui/Label"\n\nconst LabelExample = () => (\n    <div>\n        <Label htmlFor="email">Email</Label>\n        <input id="email" type="email" />\n    </div>\n)`,
    },
    css: {
        code: `.rad-ui-label{\n    display: block;\n    font-weight: 500;\n    margin-bottom: 4px;\n}`
    },
};

// API documentation
export const api_documentation = {
    label: label_api_SourceCode
};

// Component features
export const features = [
    "Pairs text with form controls using htmlFor/id attributes",
    "Clicking the label focuses the associated field",
    "Improves accessibility and assistive technology support",
    "Supports custom root class names",
];

export default code;
