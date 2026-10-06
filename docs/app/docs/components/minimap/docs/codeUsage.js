import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import provider_api from './component_api/provider.tsx';
import item_api from './component_api/item.tsx';
import waypoint_api from './component_api/waypoint.tsx';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/minimap/docs/example_1.tsx');
const scss_SourceCode = await getSourceCodeFromPath('src/components/ui/Minimap/minimap.clarity.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/minimap/docs/anatomy.tsx');

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode }
};

export const anatomy = { code: anatomy_SourceCode };

export const api_documentation = {
    provider: provider_api,
    item: item_api,
    waypoint: waypoint_api
};

export default code;
