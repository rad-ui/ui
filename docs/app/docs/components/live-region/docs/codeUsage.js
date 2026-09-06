import root_api_SourceCode from './component_api/root.tsx';
import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/live-region/docs/examples/LiveRegionExample.tsx');

const code = {
    javascript: {
        code: example_1_SourceCode
    }
};

export const api_documentation = {
    root: root_api_SourceCode
};

export const features = [
    "Polite and assertive announcement modes",
    "Visually hidden by default without removing content from the accessibility tree",
    "Configurable live region role and ARIA announcement metadata",
    "Stable data-slot and optional Theme class namespace hooks"
];

export default code;
