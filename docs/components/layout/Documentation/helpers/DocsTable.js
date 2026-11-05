"use client"
import Table from "@radui/ui/Table"
import { BookMarkLink } from '@/components/layout/Documentation/utils';
import Heading from '@radui/ui/Heading';
import Text from '@radui/ui/Text';
import Tooltip from '@radui/ui/Tooltip';
import { Info } from 'lucide-react';
import { docsBodyClassName, docsHeadingClassFor, docsSectionBlockClassName, docsSurfaceClassName } from '../shared';

const Mono = ({ children, tone = 'primary' }) => (
    <code className={`font-mono text-[0.8rem] leading-6 ${tone === 'primary' ? 'text-gray-1000' : 'text-gray-950'}`}>
        {children}
    </code>
);

const InfoButton = ({ infoText }) => {
    if (!infoText) {
        return null;
    }

    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <button
                    type="button"
                    aria-label="Show prop details"
                    className="inline-flex h-5 w-5 items-center justify-center rounded-md text-gray-950/70 transition-colors hover:bg-gray-200 hover:text-gray-1000"
                >
                    <Info size={12} strokeWidth={2.2} />
                </button>
            </Tooltip.Trigger>
            {/* className lands on the positioning wrapper; the library's inner surface owns
                background, border, padding and radius, so only constrain width here. */}
            <Tooltip.Content className="max-w-xs">
                <span className="flex flex-col gap-2">
                    {infoText}
                </span>
            </Tooltip.Content>
        </Tooltip.Root>
    );
};

const InfoRenderer = ({ row }) => {
    const prop = row.prop.name || row.prop;
    const infoText = row.prop.info_tooltips;
    return (
        <div className="flex items-center gap-1">
            <Mono>{prop}</Mono>
            <InfoButton infoText={infoText} />
        </div>
    );
}

const EnumRenderer = ({ enumValues = [] }) => {
    const enumValuesString = enumValues.map(value => `'${value}'`).join(" | ")
    return (
        <div className="flex items-center gap-1">
            <Mono tone="secondary">enum</Mono>
            <InfoButton infoText={enumValuesString} />
        </div>
    );
}

const renderCellValue = (row, columnType, value) => {
    if (columnType === "prop") {
        return <InfoRenderer row={row} />;
    }

    if (columnType === "type" && value === "enum") {
        return <EnumRenderer enumValues={row.enum_values} />;
    }

    if (columnType === "type") {
        return <Mono tone="secondary">{value}</Mono>;
    }

    if (columnType === "default") {
        return value === "--"
            ? <span aria-label="No default" className="text-gray-950/60">—</span>
            : <Mono tone="secondary">{value}</Mono>;
    }

    if (columnType === "description") {
        return <Text className="text-[0.875rem]! leading-6 text-gray-950">{value}</Text>;
    }

    if (value === "boolean" || value === "false" || value === "true") {
        return <Mono tone="secondary">{value}</Mono>;
    }

    if (typeof value === 'string') {
        return <Text className="text-[0.875rem]! leading-6 text-gray-950">{value}</Text>;
    }

    return value;
};

const DocsTable = ({ title = 'API Documentation', as = "h3", description = '', columns = [], data = [] }) => {
    return (
        <section className={docsSectionBlockClassName}>
            <div className="mb-3 space-y-1.5">
                <BookMarkLink id={title.toLowerCase().replace(/ /g, '-')}>
                    <Heading as={as} className={docsHeadingClassFor(as)}>{title}</Heading>
                </BookMarkLink>
                {description ? <Text className={docsBodyClassName}>{description}</Text> : null}
            </div>
            <Table.Root className={`docs-api-table ${docsSurfaceClassName} bg-gray-50 shadow-none`}>
                <Table.Head>
                    <Table.Row>
                        {columns.map((column, idx) => (
                            <Table.ColumnCellHeader key={idx}>
                                <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-gray-950">
                                    {column.name}
                                </span>
                            </Table.ColumnCellHeader>
                        ))}
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {data.map((row, idx) => (
                        <Table.Row key={idx}>
                            {columns.map((column, idx) => {
                                const value = row[column.id];
                                const itemToRender = renderCellValue(row, column.id, value);

                                return (
                                    <Table.Cell key={idx}>
                                        {itemToRender}
                                    </Table.Cell>
                                );
                            })}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </section>
    );
}

export default DocsTable;
