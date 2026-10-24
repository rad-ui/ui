import root_api_SourceCode from './component_api/root.tsx';
import indicator_api_SourceCode from './component_api/indicator.tsx';
import label_api from './component_api/label.tsx';
import value_api from './component_api/value.tsx';
import track_api from './component_api/track.tsx';
import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/meter/docs/examples/MeterExample.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/meter.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/meter/docs/anatomy.tsx');

const code = {
    javascript: {
        code: example_1_SourceCode
    },
    css: {
        code: scss_SourceCode
    }
};

export const api_documentation = {
    root: root_api_SourceCode,
    label: label_api,
    value: value_api,
    track: track_api,
    indicator: indicator_api_SourceCode
};

export const anatomy = { code: anatomy_SourceCode };

export const features = [
    "Uses the meter ARIA role for bounded measurements",
    "Supports min, max, low, high, and optimum thresholds",
    "Exposes data-state and threshold attributes for styling",
    "Supports compound usage with Root and Indicator parts"
];

export default code;
