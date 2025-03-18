import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const codeColorSourceCode = await getSourceCodeFromPath('docs/app/docs/components/code/examples/CodeColor.tsx');

export const code = {
    javascript: {
        code: codeColorSourceCode
    }
};
