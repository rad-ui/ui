import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const blockQuoteColorSourceCode = await getSourceCodeFromPath('docs/app/docs/components/blockquote/examples/BlockQuoteColor.tsx');

export const code = {
    javascript: {
        code: blockQuoteColorSourceCode
    }
};
