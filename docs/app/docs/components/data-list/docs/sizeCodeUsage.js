import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const dataListSizesSourceCode = await getSourceCodeFromPath('docs/app/docs/components/data-list/examples/DataListSizes.tsx');

export const code = {
    javascript: {
        code: dataListSizesSourceCode
    }
};
