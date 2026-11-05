import Text from '@radui/ui/Text';
import Heading from '@radui/ui/Heading';
import Separator from '@radui/ui/Separator';
import DocsTable from './helpers/DocsTable';

import CodeBlock from '@/components/layout/Documentation/helpers/CodeBlock';
import ComponentHero from '@/components/layout/Documentation/helpers/ComponentHero/ComponentHero';
import ComponentFeatures from '@/components/layout/Documentation/helpers/ComponentFeatures/ComponentFeatures';
import { BookMarkLink } from '@/components/layout/Documentation/utils';
import { DocsPageProvider } from './DocsPageContext';
import { ComponentMeta, DocsBreadcrumb } from './ComponentHeader';
import {
    docsBodyClassName,
    docsEyebrowClassName,
    docsHeadingClassFor,
    docsSectionBlockClassName,
    docsSectionDividerClassName,
    docsSectionHeadingClassName,
    docsSectionIntroClassName,
    docsSectionStackClassName,
    docsSubheadingClassName
} from './shared';

const componentTitleSlugExceptions = {
    AlertDialog: 'alert-dialog',
    AspectRatio: 'aspect-ratio',
    AvatarGroup: 'avatar-group',
    BlockQuote: 'blockquote',
    CheckboxCards: 'checkbox-cards',
    CheckboxGroup: 'checkbox-group',
    ContextMenu: 'context-menu',
    DataList: 'data-list',
    DirectionProvider: 'direction-provider',
    DropdownMenu: 'dropdown-menu',
    HoverCard: 'hover-card',
    LiveRegion: 'live-region',
    NavigationMenu: 'navigation-menu',
    NumberField: 'number-field',
    OTPField: 'otp-field',
    RadioCards: 'radio-cards',
    RadioGroup: 'radio-group',
    ScrollArea: 'scroll-area',
    TabNav: 'tab-nav',
    TextArea: 'text-area',
    TextField: 'text-field',
    ToggleGroup: 'toggle-group',
    VisuallyHidden: 'visually-hidden'
};

const componentTitleToSlug = (title = '') => componentTitleSlugExceptions[title]
    || title
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

const Documentation = ({ title = '', description = '', eyebrow = 'Component', currentPage = undefined, children }) => {
    const isComponent = eyebrow === 'Component' && Boolean(title);
    const componentName = title.replace(/\s+/g, '');
    const componentChangelogPath = isComponent
        ? `/docs/components/${componentTitleToSlug(title)}/changelog`
        : null;

    return <DocsPageProvider value={{ title, eyebrow }}>
        <div className="docs-article text-gray-1000">
            <header className={docsSectionIntroClassName}>
                {isComponent ? <DocsBreadcrumb /> : eyebrow ? <p className={`${docsEyebrowClassName} mb-3`}>{eyebrow}</p> : null}
                <BookMarkLink id={title}>
                    <Heading className="text-[clamp(2.125rem,4vw,2.75rem)]! font-semibold! leading-[1.05]! tracking-[-0.04em]! text-[var(--rad-ui-text-strong)]">
                        {title}
                    </Heading>
                </BookMarkLink>
                {description && (
                    <Text className={`${docsBodyClassName} mt-3 max-w-[62ch] text-[1.0625rem]! leading-8`}>
                        {description}
                    </Text>
                )}
                {isComponent ? <ComponentMeta name={componentName} changelogPath={componentChangelogPath} /> : null}
            </header>
            <div className={docsSectionStackClassName}>
                {children}
            </div>
            <Separator className={docsSectionDividerClassName} />
        </div>
    </DocsPageProvider>;
};

const Anatomy = ({ code, as = "h3", language = 'jsx' }) => {
    return <section className={docsSectionBlockClassName}>
        <BookMarkLink id="anatomy"> <Heading as={as} className={docsHeadingClassFor(as)}>Anatomy</Heading> </BookMarkLink>
        <Text className={docsBodyClassName}>Import all parts of the component and piece them together.</Text>
        <CodeBlock language={language}>
            {code}
        </CodeBlock>
    </section>;
};

const Section = ({ title = '', as = "h2", children }) => {
    return <section className={docsSectionBlockClassName}>
        <BookMarkLink id={title}> <Heading as={as} className={docsHeadingClassFor(as)}>{title}</Heading> </BookMarkLink>
        {children ? <div>{children}</div> : null}
    </section>;
};

const UnderConstruction = ({ children }) => {
    return <div className='rounded-xl border border-gray-400 bg-gray-100 p-5'>
        <Text className="mb-2 font-semibold tracking-tight text-gray-1000">
            Docs under construction
        </Text>
        <Text className="text-sm! leading-6 text-gray-950">
            Check back soon.
        </Text>
    </div>;
};

const formatTableTitle = (value = '') => value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const ApiTables = ({ tables = {}, order = Object.keys(tables), titles = {}, as = 'h3' }) => {
    return <div className="flex flex-col gap-10">
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

/** Jump links to each part's table, shown under the API heading. */
const PartChips = ({ tables = {}, order = Object.keys(tables), titles = {} }) => {
    const parts = order.filter((key) => tables[key]);
    if (parts.length < 2) return null;
    return <ul className="flex flex-wrap gap-1.5" aria-label="Parts">
        {parts.map((key) => {
            const label = titles[key] || formatTableTitle(key);
            const id = label.toLowerCase().replace(/ /g, '-');
            return <li key={key}>
                <a
                    href={`#${id}`}
                    className="inline-flex rounded-md border border-gray-400 bg-gray-50 px-2 py-0.5 font-mono text-[0.75rem] text-gray-950 transition-colors hover:border-gray-600 hover:text-gray-1000"
                >
                    {label}
                </a>
            </li>;
        })}
    </ul>;
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
                <BookMarkLink id={title}> <Heading as={titleAs} className={docsHeadingClassFor(titleAs)}>{title}</Heading> </BookMarkLink>
                <PartChips tables={tables} order={order} titles={titles} />
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

export { docsSectionHeadingClassName, docsSubheadingClassName };
export default Documentation;
