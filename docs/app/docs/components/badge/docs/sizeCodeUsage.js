import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const badgeSizesSourceCode = await getSourceCodeFromPath('docs/app/docs/components/badge/examples/BadgeSizes.tsx');

export const code = {
    javascript: {
        code: badgeSizesSourceCode
    }
};
