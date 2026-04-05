import Table from "@radui/ui/Table";

export default () => {
    return (
        <Table.Root>
            <Table.Head>
                <Table.Row>
                    <Table.ColumnCellHeader>Column header</Table.ColumnCellHeader>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>Cell</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table.Root>
    )
}
