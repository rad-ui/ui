import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const badgeVariantsSourceCode = await getSourceCodeFromPath('docs/app/docs/components/badge/examples/BadgeVariants.tsx');

export const code = {
    javascript: {
        code: badgeVariantsSourceCode
    }
};
