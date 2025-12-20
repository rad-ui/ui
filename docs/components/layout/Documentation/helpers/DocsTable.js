"use client"
import Table from "@radui/ui/Table"
import { BookMarkLink } from '@/components/layout/Documentation/utils';
import Heading from '@radui/ui/Heading';
import Text from '@radui/ui/Text';
import Tooltip from '@radui/ui/Tooltip';
import Button from '@radui/ui/Button';
import { Info } from 'lucide-react';

const InfoIcon = () => {
    return <Info className="w-full h-full" aria-hidden="true" />;
}

const InfoRenderer = ({ row }) => {
    const prop = row.prop.name || row.prop;
    const infoText = row.prop.info_tooltips;
    return (
        <span className="text-gray-950 !text-sm">
            <div className="flex items-center gap-2 text-gray-950">
                <Text className="text-gray-950 !text-sm">{prop}</Text>
                {infoText && (
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <Button size="small" variant="ghost">
                                <span style={{ width: 14, height: 14 }}>
                                    <InfoIcon />
                                </span>
                            </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content
                            className="z-[9999] bg-black rounded shadow-lg"
                        >
                            <span className="flex flex-col gap-2">
                                {infoText}
                            </span>
                        </Tooltip.Content>
                    </Tooltip.Root>
                )}
            </div>
        </span>
    );
}

const EnumRenderer = ({ enumValues=[] }) => {
    const enumValuesString = enumValues.map(value => `'${value}'`).join(" | ")
    return (
        <div className="text-gray-950 !text-sm">
            <div className="flex items-center gap-2 text-gray-950">
                <Text className="text-gray-950 !text-sm">enum</Text>
                {enumValuesString && (
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <Button size="small" variant="ghost">
                                <span style={{ width: 14, height: 14 }}>
                                    <InfoIcon />
                                </span>
                            </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                            <span className="flex flex-col gap-2">
                                {enumValuesString}
                            </span>
                        </Tooltip.Content>
                    </Tooltip.Root>
                )}
            </div>
        </div>
    );
}

const DocsTable = ({ title = 'API Documentation', as = "h3", description = '', columns = [], data = [] }) => {
    return (
        <div className="mt-10 mb-20">
            <div className="mb-4 space-y-2">
                <BookMarkLink id={title.toLowerCase().replace(/ /g, '-')}> <Heading as={as}>{title}</Heading> </BookMarkLink>
                <Text className="text-gray-950">{description}</Text>
            </div>
            <Table.Root>
                <Table.Head>
                    <Table.Row>
                        {columns.map((column, idx) => (
                            <Table.ColumnCellHeader key={idx}>
                                {column.name}
                            </Table.ColumnCellHeader>
                        ))}
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {data.map((row, idx) => (
                        <Table.Row key={idx}>
                            {columns.map((column, idx) => {
                                const value = row[column.id];
                                const columnType = column.id;

                                let itemToRender = value;
                                if (value === "boolean" || value === "false" || value === "true") {
                                    itemToRender = <Text className="text-blue-950 !text-sm">{value}</Text>;
                                }
                                if (value === "string" || value === "enum") {
                                    if (value === "enum") {
                                        const enumValues = row.enum_values;
                                        itemToRender = <EnumRenderer enumValues={enumValues} />;
                                    }
                                }

                                if (columnType === "prop") {
                                    itemToRender = <InfoRenderer row={row} />;
                                }

                                return <Table.Cell key={idx}>{itemToRender}</Table.Cell>;
                            })}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
}

export default DocsTable;