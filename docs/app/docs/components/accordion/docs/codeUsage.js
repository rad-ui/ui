import fs from 'fs';
import path from 'path';
import AccordionExample from './example_1';

// Read the source code of the example file
const example_1_SourceCode = fs.readFileSync(
    path.join(process.cwd(), '/app/docs/components/accordion/docs/example_1.tsx'),
    'utf8'
);

const path_to_scss = path.join(process.cwd(), '../styles/themes/components/accordion.scss');
const scss_SourceCode = fs.readFileSync(
    path_to_scss,
    'utf8'
);

const code = {
    javascript: {
        code: example_1_SourceCode
    },
    scss: {
        code: scss_SourceCode
    }
};

export default code;
