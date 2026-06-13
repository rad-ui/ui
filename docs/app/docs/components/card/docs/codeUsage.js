import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

// Import API documentation
import root_api_SourceCode from './component_api/root.tsx';
import header_api_SourceCode from './component_api/header.tsx';
import title_api_SourceCode from './component_api/title.tsx';
import description_api_SourceCode from './component_api/description.tsx';
import content_api_SourceCode from './component_api/content.tsx';
import footer_api_SourceCode from './component_api/footer.tsx';
import action_api_SourceCode from './component_api/action.tsx';

const scss_SourceCode = await getSourceCodeFromPath('src/components/ui/Card/card.clarity.scss');

const code = {
    javascript: {
        code: `import Card from "@radui/ui/Card"
import Button from "@radui/ui/Button"

const CardExample = () => (
    <Card variant="outline" size="small">
        <Card.Header>
            <Card.Title>Project Update</Card.Title>
            <Card.Description>A quick snapshot from the latest activity.</Card.Description>
        </Card.Header>
        <Card.Content>
            <p>The latest changes are ready for review.</p>
        </Card.Content>
        <Card.Footer>
            <Button>Action</Button>
        </Card.Footer>
    </Card>
)`
    },
    scss: {
        code: scss_SourceCode
    },
}

// API documentation
export const api_documentation = {
    root: root_api_SourceCode,
    header: header_api_SourceCode,
    title: title_api_SourceCode,
    description: description_api_SourceCode,
    content: content_api_SourceCode,
    footer: footer_api_SourceCode,
    action: action_api_SourceCode
};

// Component features
export const features = [
    "Provides a consistent container with proper spacing and borders",
    "Supports custom styling through className and customRootClass",
    "Supports compound subcomponents for structured layouts",
    "Supports visual variant and size tokens",
    "Works well with other components to create structured layouts"
];

export default code;
