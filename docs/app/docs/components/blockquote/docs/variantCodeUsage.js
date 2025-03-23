import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const blockQuoteVariantsSourceCode = await getSourceCodeFromPath('docs/app/docs/components/blockquote/examples/BlockQuoteVariants.tsx');

export const code = {
    javascript: {
        code: blockQuoteVariantsSourceCode
    }
};
