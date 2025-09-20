import Text from '@radui/ui/Text';
import Heading from '@radui/ui/Heading';
import Link from '@radui/ui/Link';
import Separator from '@radui/ui/Separator';
import Badge from '@radui/ui/Badge';
import Card from '@radui/ui/Card';
import DocsTable from './helpers/DocsTable';
import CodeBlock from '@/components/layout/Documentation/helpers/CodeBlock';
import ComponentHero from '@/components/layout/Documentation/helpers/ComponentHero/ComponentHero';
import ComponentFeatures from '@/components/layout/Documentation/helpers/ComponentFeatures/ComponentFeatures';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import TableOfContents from '@/components/TableOfContents';
import { BookMarkLink } from '@/components/layout/Documentation/utils';

const LeftArrow = () => {
    return <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

const RightArrow = () => {
    return <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

const ModernDocumentation = ({ title = '', description = '', currentPage = undefined, children }) => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex gap-8">
                {/* Main Content */}
                <div className="flex-1 max-w-4xl">
                    {/* Breadcrumbs */}
                    <Breadcrumbs />
                    
                    {/* Header */}
                    <div className="mb-8">
                        <div className='flex items-center space-x-4 mb-4'>
                            <BookMarkLink id={title}> 
                                <Heading className="text-4xl font-bold bg-gradient-to-r from-gray-1000 to-gray-600 bg-clip-text text-transparent">
                                    {title}
                                </Heading> 
                            </BookMarkLink>
                        </div>
                        {description && (
                            <Text className="text-gray-950 text-lg leading-relaxed max-w-3xl">
                                {description}
                            </Text>
                        )}
                    </div>

                    {/* Content */}
                    <div className='space-y-8'>
                        {children}
                    </div>
                    
                    <Separator className="my-12" />
                </div>
                
                {/* Sidebar */}
                <div className="hidden xl:block w-80 flex-shrink-0">
                    <TableOfContents />
                </div>
            </div>
        </div>
    );
};

const Anatomy = ({ code, as = "h3", language = 'jsx' }) => {
    return (
        <Card className="p-6 border border-gray-200">
            <div className="mb-6">
                <BookMarkLink id="anatomy"> 
                    <Heading as={as} className="mb-2 flex items-center gap-2">
                        <Badge color="green" size="small">Anatomy</Badge>
                        Component Structure
                    </Heading> 
                </BookMarkLink>
                <Text className="text-gray-950">
                    Import all parts of the component and piece them together
                </Text>
            </div>
            <CodeBlock className='mb-6' language={language}>
                {code}
            </CodeBlock>
        </Card>
    );
};

const Section = ({ title = '', as = "h2", children }) => {
    return (
        <div className="space-y-6">
            <BookMarkLink id={title}> 
                <Heading as={as} className="mb-4 flex items-center gap-3">
                    <Badge color="blue" size="small">Section</Badge>
                    {title}
                </Heading> 
            </BookMarkLink>
            <div className='space-y-6'>
                {children}
            </div>
        </div>
    );
};

const TableOfContents = ({ items = [] }) => {
    if (items.length === 0) return null;
    
    return (
        <Card className='p-6 mb-8 border border-gray-200'>
            <div className="flex items-center gap-2 mb-4">
                <Badge color="purple" size="small">Contents</Badge>
                <Heading as="h3" className="text-gray-1000">Table of Contents</Heading>
            </div>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index}>
                        <Link 
                            href={`#${item.id}`} 
                            className="text-gray-950 hover:text-gray-1000 text-sm"
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </Card>
    );
};

const UnderConstruction = ({ children }) => {
    return (
        <Card className='p-6 border border-orange-200 bg-orange-50'>
            <div className="flex items-center gap-2 mb-2">
                <Badge color="orange">Under Construction</Badge>
            </div>
            <Text className="text-gray-1000 font-medium mb-2">
                Documentation Coming Soon
            </Text>
            <Text className="text-gray-950 text-sm">
                We're working hard to bring you comprehensive documentation. Check back soon!
            </Text>
        </Card>
    );
};

// Export all components
ModernDocumentation.UnderConstruction = UnderConstruction;
ModernDocumentation.Anatomy = Anatomy;
ModernDocumentation.Section = Section;
ModernDocumentation.ComponentHero = ComponentHero;
ModernDocumentation.ComponentFeatures = ComponentFeatures;
ModernDocumentation.CodeBlock = CodeBlock;
ModernDocumentation.Table = DocsTable;
ModernDocumentation.TableOfContents = TableOfContents;

export default ModernDocumentation;
