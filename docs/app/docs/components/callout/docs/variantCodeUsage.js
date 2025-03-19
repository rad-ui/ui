import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const calloutVariantsSourceCode = await getSourceCodeFromPath('docs/app/docs/components/callout/examples/CalloutVariants.tsx');

export const code = {
    javascript: {
        code: calloutVariantsSourceCode
    }
};
