import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const buttonColorSourceCode = await getSourceCodeFromPath('docs/app/docs/components/button/examples/ButtonColor.tsx');

export const code = {
    javascript: {
        code: buttonColorSourceCode
    }
};
