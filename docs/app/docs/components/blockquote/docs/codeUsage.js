// Import API documentation
import blockquote_api_SourceCode from './api/blockquote.tsx';

const code = {
    javascript: {
        code: `import BlockQuote from "@radui/ui/BlockQuote"

const BlockQuoteExample = () => (
    <div>
        <BlockQuote color="green">
            "Behind every great man is a woman rolling her eyes." — Jim Carrey
        </BlockQuote>
    </div>
)`
    },
    scss: {
        code: `.rad-ui-block-quote{
    border-color: var(--rad-ui-color-accent-600);
    border-left-width: 0.5rem;
    padding-left: 0.75rem; // Assuming 1rem = 16px
}`
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