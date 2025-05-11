import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/switch/docs/examples/SwitchExample.tsx');

const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/switch.scss');


import root_api_SourceCode from "./component_api/root.tsx";
import thumb_api_SourceCode from "./component_api/thumb.tsx";


export const api_documentation = {
    root: root_api_SourceCode,
    thumb: thumb_api_SourceCode
};


const code = {
    javascript: {
        code: example_1_SourceCode
    },
    scss: {
        code: scss_SourceCode
    }
};


export const SwitchTable = {
    columns: [
        {name: 'Prop', id: 'prop'},
        {name: 'Type', id: 'type'},
        {name: 'Default', id: 'default'},
        {name: 'Description', id: 'description'},
    ],
    data: [
        {prop: 'color', type: 'string', default: 'null', description: 'Accent Color of the switch', id: 'color'},
    ]
};
export default code;
