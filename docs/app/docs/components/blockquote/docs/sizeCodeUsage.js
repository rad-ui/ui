import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const blockQuoteSizesSourceCode = await getSourceCodeFromPath('docs/app/docs/components/blockquote/examples/BlockQuoteSizes.tsx');

export const code = {
    javascript: {
        code: blockQuoteSizesSourceCode
    }
};
