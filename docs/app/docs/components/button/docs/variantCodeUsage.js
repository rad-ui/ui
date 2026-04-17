import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const buttonVariantsSourceCode = await getSourceCodeFromPath('docs/app/docs/components/button/examples/ButtonVariants.tsx');

export const code = {
    javascript: {
        code: buttonVariantsSourceCode
    }
};
