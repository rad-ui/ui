import Kbd from '@radui/ui/Kbd';
import Text from '@radui/ui/Text';
import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
const COMPONEN_FOLDER = 'avatar-group';
const example_1_SourceCode = await getSourceCodeFromPath(`docs/app/docs/components/${COMPONEN_FOLDER}/docs/example_1.tsx`);
// console.log(example_1_SourceCode);


const scss_SourceCode = await getSourceCodeFromPath(`styles/themes/components/${COMPONEN_FOLDER}.scss`);
const anatomy_SourceCode = await getSourceCodeFromPath(`docs/app/docs/components/${COMPONEN_FOLDER}/docs/accordion_anatomy.tsx`);

export const code = {
    javascript: {
        code: example_1_SourceCode
    },
    scss: {
        code: scss_SourceCode
    }
};

export const anatomy = {
    code: anatomy_SourceCode
}


    


export default code