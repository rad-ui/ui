import Kbd from '@radui/ui/Kbd';
import Text from '@radui/ui/Text';
import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/table/docs/example_1.tsx');

const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/table.scss');
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/table/docs/anatomy.tsx');

//
import root_api_SourceCode from './component_api/root.tsx';
import head_api_SourceCode from './component_api/head.tsx';
import body_api_SourceCode from './component_api/body.tsx';
import row_api_SourceCode from './component_api/row.tsx';
import column_header_api_SourceCode from './component_api/column-header.tsx';
import cell_api_SourceCode from './component_api/cell.tsx';

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

export const api_documentation = {
    root: root_api_SourceCode,
    head: head_api_SourceCode,
    body: body_api_SourceCode,
    row: row_api_SourceCode,
    column_header: column_header_api_SourceCode,
    cell: cell_api_SourceCode
}

export default code