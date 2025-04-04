"use client"
import Table from "@radui/ui/Table"
import { BookMarkLink } from '@/components/layout/Documentation/utils';
import Heading from '@radui/ui/Heading';
import Text from '@radui/ui/Text';
import Code from '@radui/ui/Code';
import Tooltip from '@radui/ui/Tooltip';
import Button from '@radui/ui/Button';

const InfoIcon = () => {
    return <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3.5C6 2.67157 6.67157 2 7.5 2C8.32843 2 9 2.67157 9 3.5C9 4.32843 8.32843 5 7.5 5C6.67157 5 6 4.32843 6 3.5ZM8 5.94999C9.14112 5.71836 10 4.70948 10 3.5C10 2.11929 8.88071 1 7.5 1C6.11929 1 5 2.11929 5 3.5C5 4.70948 5.85888 5.71836 7 5.94999V13.5C7 13.7761 7.22386 14 7.5 14C7.77614 14 8 13.7761 8 13.5V5.94999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
}

const InfoRenderer = ({ row }) => {

    const prop = row.prop
    let infoText = ""
    switch(row.prop){
        case "className":
            infoText = "The class name for the component."
            break;
        case "asChild":
            infoText = "Whether to use the child component as the Accordion."
            break;
        case "loop":
            infoText = "Whether to loop through the Accordion items."
            break;
        case "orientation":
            infoText = "The orientation of the Accordion."
            break;
        case "openMultiple":
            infoText = "Whether to allow multiple items to be open at once."
            break;
    }

    return <span className="text-gray-950 !text-sm">
        <div className="flex items-center gap-2 text-gray-950">
            <Text className="text-gray-950 !text-sm">{prop}</Text>
            {infoText && <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <Button size="small" variant="ghost" >
                        <span style={{ width: 14, height: 14 }}>
                            <InfoIcon />
                        </span>
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                    <span className="flex flex-col gap-2">
                        {infoText}
                    </span>
                </Tooltip.Content>
            </Tooltip.Root>}
        </div>



    </span>
}


const EnumRenderer = ({ enumValues }) => {
    let enumValuesString = enumValues.map(value => `\'${value}\'`).join(" | ");
    return <div className="text-gray-950 !text-sm">

        <div className="flex items-center gap-2 text-gray-950">
            <Text className="text-gray-950 !text-sm">`enum`</Text>
            {enumValuesString && <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <Button size="small" variant="ghost" >
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
            </Tooltip.Root>}
        </div>



        {/* {enumValues.map((enumValue, idx) => (
            <Text key={idx} className="text-gray-950 !text-sm">`{enumValue}`</Text>
        ))} */}
    </div>
}
const DocsTable = ({ title = 'API Documentation', as = "h3", description = '', columns = [], data = [] }) => {
    return <div className="mt-10 mb-20">
        <div className="mb-4 space-y-2">
            <BookMarkLink id="api-documentation"> <Heading as={as}>{title}</Heading> </BookMarkLink>
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

                            // Info Tooltips

                            // Custom Rendering
                            const value = row[column.id];
                            const columnType = column.id;




                            let itemToRender = value;
                            if (value === "boolean" || value === "false" || value === "true") {
                                itemToRender = <Text className="text-blue-950 !text-sm">{value}</Text>
                            }
                            if (value === "string" || value === "enum") {
                                // console.log(value, row.enum_values);
                                if (value == "enum") {
                                    let enumValues = row.enum_values;
                                    itemToRender = <EnumRenderer enumValues={enumValues} />
                                }

                            }

                            if (columnType === "prop") {

                                itemToRender = <InfoRenderer row={row} />

                            }


                            return <Table.Cell key={idx}>{itemToRender}</Table.Cell>
                        })}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    </div>
}

export default DocsTable;