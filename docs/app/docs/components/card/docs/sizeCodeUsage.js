import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const cardSizesSourceCode = await getSourceCodeFromPath('docs/app/docs/components/card/examples/CardSizes.tsx');

export const code = {
    javascript: {
        code: cardSizesSourceCode
    }
};
