// Import API documentation
import link_api_SourceCode from './component_api/link.tsx';

const code = {
    javascript: {
        code: `import Link from "@radui/ui/Link"

const LinkExample = () => (
    <Link href="https://rad-ui.com" target="_blank">Rad UI</Link>
)`
    },
    scss: {
        code: `.rad-ui-link{
    color: var(--rad-ui-color-indigo-900);
}
.rad-ui-link:hover{
    text-decoration: underline;
}`
    },
};

// API documentation
export const api_documentation = {
    link: link_api_SourceCode,
};

// Component features
export const features = [
    "Supports external and internal navigation",
    "Adjustable sizes",
    "Accessible keyboard navigation",
];

export default code;
