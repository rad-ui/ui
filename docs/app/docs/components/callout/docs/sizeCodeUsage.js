import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const calloutSizesSourceCode = await getSourceCodeFromPath('docs/app/docs/components/callout/examples/CalloutSizes.tsx');

export const code = {
    javascript: {
        code: calloutSizesSourceCode
    }
};
