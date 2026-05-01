import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

// Import API documentation
import heading_api_SourceCode from './component_api/heading.tsx';

const scss_SourceCode = await getSourceCodeFromPath('src/components/ui/Heading/heading.clarity.scss');

const code = {
    javascript: {
        code: `import Heading from "@radui/ui/Heading"

const HeadingExamples = () => (
    <div>
        <Heading>Heading 1</Heading>
        <Heading as="h2">Heading 2</Heading>
        <Heading as="h3">Heading 3</Heading>
        <Heading as="h4">Heading 4</Heading>
        <Heading as="h5">Heading 5</Heading>
        <Heading as="h6">Heading 6</Heading>
    </div>
)`
    },
    scss: {
        code: scss_SourceCode
    },
}

// API documentation
export const api_documentation = {
    heading: heading_api_SourceCode
};

// Component features
export const features = [
    "Six different heading levels (h1-h6)",
    "Each heading level has appropriate styling out of the box",
    "Preserves semantic meaning with proper HTML tags",
    "Customizable with className and style props"
];

// Legacy table export - keeping for backward compatibility
export const headingBasicUsageExample = {
    columns: [
     {name: 'Prop', id: 'prop'},
     {name: 'Type', id: 'type'},
     {name: 'Default', id: 'default'},
     {name: 'Description', id: 'description'},
    ],
    data: [
     {prop: 'as', type: 'string', default: 'h1', description: 'Allows the component to render different heading levels (h1 to h6)', id: 'src'},
    ]
}

export default code;
