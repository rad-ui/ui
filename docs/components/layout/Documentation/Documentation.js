import Text from '@radui/ui/Text';
import Heading from '@radui/ui/Heading';
import Separator from '@radui/ui/Separator';
import DocsTable from './helpers/DocsTable';

import CodeBlock from '@/components/layout/Documentation/helpers/CodeBlock';
import ComponentHero from '@/components/layout/Documentation/helpers/ComponentHero/ComponentHero';
import ComponentFeatures from '@/components/layout/Documentation/helpers/ComponentFeatures/ComponentFeatures';
import { BookMarkLink } from '@/components/layout/Documentation/utils';
import {
    docsSectionBlockClassName,
    docsSectionDividerClassName,
    docsSectionHeadingClassName,
    docsSectionIntroClassName,
    docsSectionStackClassName
} from './shared';

const Documentation = ({ title = '', description = '', currentPage = undefined, children }) => {
    return <div className="text-gray-1000">
        <div className={docsSectionIntroClassName}>
            <div className='relative top-[1px]'>
                <BookMarkLink id={title}> <Heading>{title}</Heading> </BookMarkLink>
            </div>
            {description && <Text className="relative top-[-4px] text-gray-800">{description}</Text>}
        </div>
        <div className={docsSectionStackClassName}>
            {children}
        </div>
        <Separator className={docsSectionDividerClassName} />
    </div>;
};

const Anatomy = ({ code, as = "h3", language = 'jsx' }) => {
    return <section className={docsSectionBlockClassName}>
        <BookMarkLink id="anatomy"> <Heading as={as} className={docsSectionHeadingClassName}>Anatomy</Heading> </BookMarkLink>
        <Text className="text-gray-800">Import all parts of the component and piece them together</Text>
        <CodeBlock language={language}>
            {code}
        </CodeBlock>
    </section>;
};

const Section = ({ title = '', as = "h2", children }) => {
    return <section className={docsSectionBlockClassName}>
        <BookMarkLink id={title}> <Heading as={as} className={docsSectionHeadingClassName}>{title}</Heading> </BookMarkLink>
        {children ? <div>{children}</div> : null}
    </section>;
};

const UnderConstruction = ({ children }) => {
    return <div className='rounded-xl border border-gray-300 bg-gray-100 p-5'>
        <Text className="mb-2 text-gray-1000 font-bold">
            Docs Under Construction
        </Text>
        <Text className="mb-2 text-gray-1000 font-light !text-sm">
            Check Back soon!
        </Text>
    </div>;
};

const formatTableTitle = (value = '') => value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const ApiTables = ({ tables = {}, order = Object.keys(tables), titles = {}, as = 'h3' }) => {
    return <div className="flex flex-col gap-12">
        {order.map((key) => {
            const table = tables[key];

            if (!table) {
                return null;
            }

            return (
                <DocsTable
                    key={key}
                    as={as}
                    title={titles[key] || formatTableTitle(key)}
                    description={table.description}
                    columns={table.columns}
                    data={table.data}
                />
            );
        })}
    </div>;
};

const ApiReference = ({
    title = 'API Documentation',
    titleAs = 'h2',
    anatomy,
    anatomyLanguage = 'jsx',
    tables = {},
    order,
    titles,
    tableAs = 'h3'
}) => {
    return (
        <section className={docsSectionStackClassName}>
            <div className={docsSectionBlockClassName}>
                <BookMarkLink id={title}> <Heading as={titleAs} className={docsSectionHeadingClassName}>{title}</Heading> </BookMarkLink>
            </div>
            {anatomy ? <Anatomy code={anatomy} language={anatomyLanguage} /> : null}
            <ApiTables tables={tables} order={order} titles={titles} as={tableAs} />
        </section>
    );
};


Documentation.UnderConstruction = UnderConstruction;
Documentation.Anatomy = Anatomy;
Documentation.ApiReference = ApiReference;
Documentation.ApiTables = ApiTables;
Documentation.Section = Section;
Documentation.ComponentHero = ComponentHero;
Documentation.ComponentFeatures = ComponentFeatures;
Documentation.CodeBlock = CodeBlock;
Documentation.Table = DocsTable;

export default Documentation;
