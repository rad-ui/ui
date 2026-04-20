import { createDocsPage } from '@/components/docsPage/createDocsPage';
import metadata from './seo';
import Content from './content.mdx';

export { metadata };

export default createDocsPage(Content);
