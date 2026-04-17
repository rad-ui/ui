import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import blockquote_api_SourceCode from './component_api/blockquote.tsx';
const example_1_SourceCode = await getSourceCodeFromPath(`docs/app/docs/components/blockquote/examples/BlockQuoteExample.tsx`);

const scss_SourceCode = await getSourceCodeFromPath('styles/themes/components/blockquote.scss');


const code = {
    javascript: {
        code: example_1_SourceCode
    },
    scss: {
        code: scss_SourceCode
    },
}

// API documentation
export const api_documentation = {
    blockquote: blockquote_api_SourceCode
};

// Component features
export const features = [
    "Multiple size options: small, medium, large, x-large",
    "Customizable with different color themes",
    "Clean and simple styling for emphasized quotes",
    "Follows typography best practices",
    "Perfect for testimonials and citations"
];

// Kept for backwards compatibility
export const BlockQuoteTable = {
   columns : [
        {name: 'Prop', id: 'prop'},
        {name: 'Type', id: 'type'},
        {name: 'Default', id: 'default'},
        {name: 'Description', id: 'description'},
    ],

     data : [
        {prop: 'color', type: 'string', default: 'null', description: 'Accent Color of the quote', id: 'color'},
    ]
}

export default code;