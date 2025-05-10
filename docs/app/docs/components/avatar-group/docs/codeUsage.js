import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
const COMPONENT_FOLDER = 'avatar-group';
const example_1_SourceCode = await getSourceCodeFromPath(`docs/app/docs/components/${COMPONENT_FOLDER}/docs/example_1.tsx`);


const scss_SourceCode = await getSourceCodeFromPath(`styles/themes/components/${COMPONENT_FOLDER}.scss`);
const anatomy_SourceCode = await getSourceCodeFromPath(`docs/app/docs/components/${COMPONENT_FOLDER}/docs/avatarGroup_anatomy.tsx`);

import root_api_SourceCode from './api/root.tsx';
import item_api_SourceCode from './api/item.tsx';
import avatar_api_SourceCode from './api/avatar.tsx';
import fallback_api_SourceCode from './api/fallback.tsx';


export const code = {
    javascript: {
        code: example_1_SourceCode
    },
    scss: {
        code: scss_SourceCode
    }
};

export const anatomy = {
    code: anatomy_SourceCode
}


export const api_documentation = {
    root: root_api_SourceCode,
    item: item_api_SourceCode,
    avatar: avatar_api_SourceCode,
    fallback: fallback_api_SourceCode,
}


export default code;