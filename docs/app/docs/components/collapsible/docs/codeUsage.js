import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root.tsx';
import trigger_api from './component_api/trigger.tsx';
import content_api from './component_api/content.tsx';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/collapsible/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/collapsible.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/collapsible/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    root: root_api,
    trigger: trigger_api,
    content: content_api
};

export default code;
