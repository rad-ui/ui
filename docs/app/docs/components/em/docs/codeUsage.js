import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

// const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/em.scss');
const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/em/docs/EmExample.tsx');

const code = {
    javascript: {
        code: example_1_SourceCode,
    },
    css: {
        code: 'todo'
    },
}

export default code;