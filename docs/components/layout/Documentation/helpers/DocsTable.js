"use client"
import Table from "@radui/ui/Table"
import { BookMarkLink } from '@/components/layout/Documentation/utils';
import Heading from '@radui/ui/Heading';
import Text from '@radui/ui/Text';
import Tooltip from '@radui/ui/Tooltip';
import { Info } from 'lucide-react';
import { docsSectionBlockClassName, docsSectionHeadingClassName, docsSurfaceClassName } from '../shared';

const InlineCode = ({ children, tone = 'neutral' }) => {
    const toneClassName = tone === 'accent'
        ? 'border-green-500 bg-green-50 text-green-1000'
        : 'border-gray-300 bg-gray-50 text-gray-950';

    return (
        <span className={`inline-flex min-h-7 items-center rounded-md border px-2 py-1 font-mono text-[12px] leading-none ${toneClassName}`}>
            {children}
        </span>
    );
};

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
                    className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-300 bg-gray-50 text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-950"
                >
                    <Info size={12} strokeWidth={2.2} />
                </button>
            </Tooltip.Trigger>
            <Tooltip.Content className="z-50 max-w-xs rounded-lg border border-gray-700 bg-[var(--rad-ui-surface-inverse)] px-3 py-2 text-sm text-[var(--rad-ui-text-inverse)] shadow-xl">
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
        <div className="flex items-start gap-2 text-gray-950">
            <InlineCode tone="accent">{prop}</InlineCode>
            <InfoButton infoText={infoText} />
        </div>
    );
}

const EnumRenderer = ({ enumValues = [] }) => {
    const enumValuesString = enumValues.map(value => `'${value}'`).join(" | ")
    return (
        <div className="flex items-start gap-2 text-gray-950">
            <InlineCode tone="accent">enum</InlineCode>
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
        return <InlineCode tone="accent">{value}</InlineCode>;
    }

    if (columnType === "default") {
        const tone = value === "--" ? 'neutral' : 'accent';
        return <InlineCode tone={tone}>{value}</InlineCode>;
    }

    if (columnType === "description") {
        return <Text className="text-sm! leading-6 text-gray-900">{value}</Text>;
    }

    if (value === "boolean" || value === "false" || value === "true") {
        return <InlineCode tone="accent">{value}</InlineCode>;
    }

    if (typeof value === 'string') {
        return <Text className="text-sm! leading-6 text-gray-900">{value}</Text>;
    }

    return value;
};

const DocsTable = ({ title = 'API Documentation', as = "h3", description = '', columns = [], data = [] }) => {
    return (
        <section className={docsSectionBlockClassName}>
            <div className="mb-4 space-y-2">
                <BookMarkLink id={title.toLowerCase().replace(/ /g, '-')}>
                    <Heading as={as} className={docsSectionHeadingClassName}>{title}</Heading>
                </BookMarkLink>
                {description ? <Text className="text-[0.98rem] leading-7 text-gray-900">{description}</Text> : null}
            </div>
            <Table.Root className={`${docsSurfaceClassName} bg-gray-50 shadow-none`}>
                <Table.Head>
                    <Table.Row>
                        {columns.map((column, idx) => (
                            <Table.ColumnCellHeader key={idx}>
                                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-700">
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
                                        <div className="py-1">
                                            {itemToRender}
                                        </div>
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
