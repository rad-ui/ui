import Text from '@radui/ui/Text';
import Heading from '@radui/ui/Heading';
import Link from '@radui/ui/Link';
import Separator from '@radui/ui/Separator';
import DocsTable from './helpers/DocsTable';

import CodeBlock from '@/components/layout/Documentation/helpers/CodeBlock';
import ComponentHero from '@/components/layout/Documentation/helpers/ComponentHero/ComponentHero';
import ComponentFeatures from '@/components/layout/Documentation/helpers/ComponentFeatures/ComponentFeatures';
import { BookMarkLink } from '@/components/layout/Documentation/utils';



const LeftArrow = () => {
    return <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

const RightArrow = () => {
    return <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

const Documentation = ({ title = '', description = '', currentPage = undefined, children }) => {
    return <div>
        <div>
            <div className='flex items-center space-x-4'>
                <BookMarkLink id={title}> <Heading>{title}</Heading> </BookMarkLink>
            </div>
            {description && <Text className="mb-4 text-gray-900 font-light">{description}</Text>}
        </div>
        <div className='mt-4'>
            {children}
        </div>
        <Separator className="my-10" />
    </div>;
};


const Anatomy = ({ code, language = 'jsx' }) => {
    return <div className='mt-10'>
        <BookMarkLink id="anatomy"> <Heading as="h2" className="mb-2">Anatomy</Heading> </BookMarkLink>
        <Text className="mb-4 text-gray-950 font-light">Import all parts of the component and piece them together</Text>
        <CodeBlock className='mb-10' language={language}>
            {code}
        </CodeBlock>
    </div>;
};

const Section = ({ title = '', children }) => {
    return <div>
        <BookMarkLink id={title}> <Heading as="h6" className="mb-2">{title}</Heading> </BookMarkLink>
        <div className='mb-10'>
            {children}
        </div>
    </div>;
};

const UnderConstruction = ({ children }) => {
    return <div className='bg-gray-200 text-gray-1000  rounded-md'>
        <Text className="mb-2 text-gray-1000 font-bold">
            Docs Under Construction
        </Text>
        <Text className="mb-2 text-gray-1000 font-light !text-sm">
            Check Back soon!
        </Text>
    </div>;
};



Documentation.UnderConstruction = UnderConstruction;
Documentation.Anatomy = Anatomy;
Documentation.Section = Section;
Documentation.ComponentHero = ComponentHero;
Documentation.ComponentFeatures = ComponentFeatures;
Documentation.CodeBlock = CodeBlock;
Documentation.Table = DocsTable;

export default Documentation;
