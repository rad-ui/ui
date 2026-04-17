import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const buttonSizesSourceCode = await getSourceCodeFromPath('docs/app/docs/components/button/examples/ButtonSizes.tsx');

export const code = {
    javascript: {
        code: buttonSizesSourceCode
    }
};
