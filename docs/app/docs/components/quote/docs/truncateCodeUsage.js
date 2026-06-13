import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const quoteTruncateSourceCode = await getSourceCodeFromPath('docs/app/docs/components/quote/examples/QuoteTruncate.tsx');

export const code = {
    javascript: {
        code: quoteTruncateSourceCode
    }
};
