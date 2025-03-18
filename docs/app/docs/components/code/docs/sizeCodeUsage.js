import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const codeSizesSourceCode = await getSourceCodeFromPath('docs/app/docs/components/code/examples/CodeSizes.tsx');

export const code = {
    javascript: {
        code: codeSizesSourceCode
    }
};
