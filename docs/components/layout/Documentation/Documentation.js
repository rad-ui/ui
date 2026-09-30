import Text from '@radui/ui/Text';
import Heading from '@radui/ui/Heading';
import Separator from '@radui/ui/Separator';
import DocsTable from './helpers/DocsTable';

import CodeBlock from '@/components/layout/Documentation/helpers/CodeBlock';
import ComponentHero from '@/components/layout/Documentation/helpers/ComponentHero/ComponentHero';
import ComponentFeatures from '@/components/layout/Documentation/helpers/ComponentFeatures/ComponentFeatures';
import { BookMarkLink } from '@/components/layout/Documentation/utils';
import {
    docsBodyClassName,
    docsEyebrowClassName,
    docsSectionBlockClassName,
    docsSectionDividerClassName,
    docsSectionHeadingClassName,
    docsSectionIntroClassName,
    docsSectionStackClassName
} from './shared';

const Documentation = ({ title = '', description = '', eyebrow = 'Component', currentPage = undefined, children }) => {
    return <div className="docs-article text-gray-1000">
        <div className={docsSectionIntroClassName}>
            {eyebrow ? <p className={docsEyebrowClassName}>{eyebrow}</p> : null}
            <div>
                <BookMarkLink id={title}>
                    <Heading className="!text-[clamp(2rem,4vw,2.75rem)] !font-semibold !leading-[1.05] !tracking-[-0.04em] text-[var(--rad-ui-text-strong)]">
                        {title}
                    </Heading>
                </BookMarkLink>
            </div>
            {description && (
                <Text className={`${docsBodyClassName} max-w-2xl text-base leading-8`}>
                    {description}
                </Text>
            )}
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
        <Text className="text-[0.98rem] leading-7 text-gray-900">Import all parts of the component and piece them together</Text>
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
    return <div className='rounded-xl border border-gray-400 bg-gray-100 p-5'>
        <Text className="mb-2 font-semibold tracking-tight text-gray-1000">
            Docs under construction
        </Text>
        <Text className="!text-sm leading-6 text-gray-900">
            Check back soon.
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
