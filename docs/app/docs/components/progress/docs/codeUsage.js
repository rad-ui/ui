// Import API documentation
import root_api_SourceCode from './api/root.tsx';
import indicator_api_SourceCode from './api/indicator.tsx';
import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/progress/docs/examples/ProgressExample.tsx');

const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/progress.scss');


const code = {
    javascript: {
        code: example_1_SourceCode

    },
    css: {
        code: scss_SourceCode
    }

};

// API documentation
export const api_documentation = {
    root: root_api_SourceCode,
    indicator: indicator_api_SourceCode
};

// Component features
export const features = [
    "Displays completion status visually as a horizontal bar",
    "Supports minimum and maximum value configuration",
    "Customizable color themes",
    "Smooth animations for value changes"
];

export default code;
