import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
// Import API documentation
import root_api_SourceCode from './component_api/root.tsx';
import text_api_SourceCode from './component_api/text.tsx';
import icon_api_SourceCode from './component_api/callout_icon.tsx';

const example_1_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/callout/examples/CalloutExample.tsx');

const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/callout.scss');
const code = {
    javascript: {
        code: example_1_SourceCode
    },
    scss: {
        code: scss_SourceCode
    }
};



// API documentation
export const api_documentation = {
    root: root_api_SourceCode,
    text: text_api_SourceCode,
    icon: icon_api_SourceCode
};

// Component features
export const features = [
    "Display important messages with visual emphasis",
    "Supports different colors to indicate message type (info, warning, error, etc.)",
    "Multiple size variants for different contexts",
    "Customizable appearance with variant props",
    "Works well with icons and other components"
];

// Legacy table export - keeping for backward compatibility
export const calloutTable = {
  columns: [
   {name: 'Prop', id: 'prop'},
   {name: 'Type', id: 'type'},
   {name: 'Default', id: 'default'},
   {name: 'Description', id: 'description'},
  ],
  data: [
   { prop: 'color', type: 'string', default: 'null', description: 'Accent color of the Callout text.', id: 'color' },]
}

export default code;
