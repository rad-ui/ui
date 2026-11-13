"use client"
import Table from "@radui/ui/Table";

const columns = [
  { name: 'Area', id: 'area', align: 'start' },
  { name: 'Restaurants', id: 'restaurants', align: 'end' },
  { name: 'Orders / month', id: 'orders', align: 'end' },
  { name: 'Dominant phase', id: 'phase', align: 'start' },
  { name: 'Minutes wasted / day', id: 'minutes', align: 'end' }
] as const;

const data = [
  { id: '1', area: 'Serilingampally', restaurants: 3, orders: '14,474', phase: 'Parking', minutes: '2,610' },
  { id: '2', area: 'Sai Tulasi Layout', restaurants: 3, orders: '3,980', phase: 'Entry', minutes: '1,007' },
  { id: '3', area: 'Kondapur', restaurants: 4, orders: '3,606', phase: 'Parking', minutes: '555' },
  { id: '4', area: 'Sri Ram Nagar', restaurants: 2, orders: '2,570', phase: 'Collection', minutes: '397' }
];

const TableDenseExample = () => (
  <div className="w-full max-w-3xl">
    <Table.Root size="small">
      <Table.Head>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnCellHeader key={column.id} align={column.align}>
              {column.name}
            </Table.ColumnCellHeader>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map((row) => (
          <Table.Row key={row.id}>
            {columns.map((column) => (
              <Table.Cell key={`${row.id}-${column.id}`} align={column.align}>
                {row[column.id]}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  </div>
);

export default TableDenseExample;
