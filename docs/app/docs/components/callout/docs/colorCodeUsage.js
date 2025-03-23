import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const calloutColorSourceCode = await getSourceCodeFromPath('docs/app/docs/components/callout/examples/CalloutColor.tsx');

export const code = {
    javascript: {
        code: calloutColorSourceCode
    }
};
