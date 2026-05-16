import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const dataListColorSourceCode = await getSourceCodeFromPath('docs/app/docs/components/data-list/examples/DataListColor.tsx');

export const code = {
    javascript: {
        code: dataListColorSourceCode
    }
};
