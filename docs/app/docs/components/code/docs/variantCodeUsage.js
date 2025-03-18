import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const codeVariantsSourceCode = await getSourceCodeFromPath('docs/app/docs/components/code/examples/CodeVariants.tsx');

export const code = {
    javascript: {
        code: codeVariantsSourceCode
    }
};
