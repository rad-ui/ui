import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/avatar/docs/AvatarExample.tsx');
const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/avatar.scss');


//
import root_api_SourceCode from './component_api/root.tsx';
import image_api_SourceCode from './component_api/image.tsx';
import fallback_api_SourceCode from './component_api/fallback.tsx';

export const code = {
    javascript: {
        code: example_1_SourceCode
    },
    scss: {
        code: scss_SourceCode
    }
}


export const api_documentation = {
    root: root_api_SourceCode,
    image: image_api_SourceCode,
    fallback: fallback_api_SourceCode,
}

export const avatarBasicUsageExample = {
    columns: [
     {name: 'Prop', id: 'prop'},
     {name: 'Type', id: 'type'},
     {name: 'Default', id: 'default'},
     {name: 'Description', id: 'description'},
    ],
    data: [
     {prop: 'src', type: 'string', default: "''", description: 'URL of the image to be displayed as the avatar.', id: 'src'},
     {prop: 'fallback', type: 'string', default: "''", description: 'Text initials or placeholder displayed when the image fails to load or if no src is provided.', id: 'fallback'},
     {prop: 'color', type: 'string', default: "''", description: 'Accent Color of the text initials or placeholder displayed when the image fails to load or if no src is provided.', id: 'color'},
    ]
 }

export default code;