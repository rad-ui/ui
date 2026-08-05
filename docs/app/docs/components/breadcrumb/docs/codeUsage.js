import { getSourceCodeFromPath } from '@/utils/parseSourceCode';
import root_api_SourceCode from './component_api/root.tsx';
import parts_api_SourceCode from './component_api/parts.tsx';

const scss_SourceCode = await getSourceCodeFromPath('src/components/ui/Breadcrumb/breadcrumb.clarity.scss');

const code = {
    javascript: {
        code: `import Breadcrumb from "@radui/ui/Breadcrumb"

const BreadcrumbExample = () => (
    <Breadcrumb.Root>
        <Breadcrumb.List>
            <Breadcrumb.Item>
                <Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link>
                <Breadcrumb.Separator />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
                <Breadcrumb.Separator />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
            </Breadcrumb.Item>
        </Breadcrumb.List>
    </Breadcrumb.Root>
)`
    },
    scss: {
        code: scss_SourceCode
    },
}

export const api_documentation = {
    root: root_api_SourceCode,
    parts: parts_api_SourceCode
};

export const features = [
    "Uses native nav and ordered-list semantics",
    "Marks the current page with aria-current by default",
    "Supports router links through Breadcrumb.Link asChild",
    "Exposes stable classes for each part",
    "Allows custom separator content"
];

export default code;
