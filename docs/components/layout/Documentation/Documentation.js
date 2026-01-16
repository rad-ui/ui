import Text from '@radui/ui/Text';
import Heading from '@radui/ui/Heading';
import Link from '@radui/ui/Link';
import Separator from '@radui/ui/Separator';
import DocsTable from './helpers/DocsTable';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import CodeBlock from '@/components/layout/Documentation/helpers/CodeBlock';
import ComponentHero from '@/components/layout/Documentation/helpers/ComponentHero/ComponentHero';
import ComponentFeatures from '@/components/layout/Documentation/helpers/ComponentFeatures/ComponentFeatures';
import { BookMarkLink } from '@/components/layout/Documentation/utils';



const LeftArrow = () => {
    return <ChevronLeft size={18} />;
};

const RightArrow = () => {
    return <ChevronRight size={18} />;
};

const Documentation = ({ title = '', description = '', currentPage = undefined, children }) => {
    return <div>
        <div>
            <div className='flex items-center space-x-4 relative top-[1px]'>
                <BookMarkLink id={title}> <Heading>{title}</Heading> </BookMarkLink>
            </div>
            {description && <Text className="mb-4 text-gray-900 font-light relative top-[-4px]">{description}</Text>}
        </div>
        <div className='mt-4'>
            {children}
        </div>
        <Separator className="my-10" />
    </div>;
};

const Anatomy = ({ code, as = "h3", language = 'jsx' }) => {
    return <div className='mt-10'>
        <BookMarkLink id="anatomy"> <Heading as={as} className="mb-2">Anatomy</Heading> </BookMarkLink>
        <Text className="mb-4 text-gray-950 font-light">Import all parts of the component and piece them together</Text>
        <CodeBlock className='mb-10' language={language}>
            {code}
        </CodeBlock>
    </div>;
};

const Section = ({ title = '', as = "h2", children }) => {
    return <div>
        <BookMarkLink id={title}> <Heading as={as} className="mb-2">{title}</Heading> </BookMarkLink>
        <div className=''>
            {children}
        </div>
        <Separator className="my-10" />
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
