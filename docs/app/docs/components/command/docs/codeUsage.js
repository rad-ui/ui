import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api from './component_api/root.tsx';
import dialog_api from './component_api/dialog.tsx';
import item_api from './component_api/item.tsx';

const exampleSourceCode = await getSourceCodeFromPath('docs/app/docs/components/command/docs/example_1.tsx');
const anatomySourceCode = await getSourceCodeFromPath('docs/app/docs/components/command/docs/anatomy.tsx');
const scssSourceCode = await getSourceCodeFromPath('src/components/ui/Command/command.clarity.scss');

export const code = {
    javascript: { code: exampleSourceCode },
    scss: { code: scssSourceCode }
};

export const anatomy = { code: anatomySourceCode };

export const api_documentation = {
    root: root_api,
    dialog: dialog_api,
    item: item_api
};
