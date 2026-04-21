import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const hoverCardSizesSourceCode = await getSourceCodeFromPath('docs/app/docs/components/hover-card/examples/HoverCardSizes.tsx');

export const code = {
    javascript: {
        code: hoverCardSizesSourceCode
    }
};
