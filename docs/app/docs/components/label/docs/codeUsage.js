import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

import label_api_SourceCode from './component_api/label.tsx';

const example_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/label/docs/examples/LabelExample.tsx');
const scss_SourceCode = await getSourceCodeFromPath('src/components/ui/Label/label.clarity.scss');

const code = {
    javascript: {
        code: example_SourceCode
    },
    scss: {
        code: scss_SourceCode
    }
};

export const api_documentation = {
    label: label_api_SourceCode
};

export const features = [
    "Native <label>, so clicking it focuses or toggles the control it names",
    "Name a control with htmlFor, or by wrapping the control",
    "Double-clicking the label doesn't select its text; nested controls still get their own clicks",
    "asChild to render your own element with the label's props",
    "Unstyled by default, with Clarity and baremetal styles available"
];

export default code;
