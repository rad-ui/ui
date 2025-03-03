import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const badgeColorSourceCode = await getSourceCodeFromPath('docs/app/docs/components/badge/examples/BadgeColor.tsx');

export const code = {
    javascript: {
        code: badgeColorSourceCode
    }
};
