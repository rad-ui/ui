import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const cardVariantsSourceCode = await getSourceCodeFromPath('docs/app/docs/components/card/examples/CardVariants.tsx');

export const code = {
    javascript: {
        code: cardVariantsSourceCode
    }
};
