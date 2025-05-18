"use client"
import Table from "@radui/ui/Table";

const columns = [
  { name: 'Name', id: 'name' },
  { name: 'Role', id: 'role' },
  { name: 'Ability', id: 'ability' },
  { name: 'Ship', id: 'ship' },
  { name: 'Status', id: 'status' }
];

const data = [
  { 
    id: '1', 
    name: 'Neo (Thomas Anderson)', 
    role: 'The One', 
    ability: 'Code manipulation, Flight', 
    ship: 'Nebuchadnezzar',
    status: 'Awakened' 
  },
  { 
    id: '2', 
    name: 'Trinity', 
    role: 'First Mate', 
    ability: 'Hacking, Combat',
    ship: 'Nebuchadnezzar',
    status: 'Awakened' 
  },
  { 
    id: '3', 
    name: 'Morpheus', 
    role: 'Captain', 
    ability: 'Leadership, Combat',
    ship: 'Nebuchadnezzar',
    status: 'Awakened' 
  },
  { 
    id: '4', 
    name: 'Agent Smith', 
    role: 'Agent', 
    ability: 'Replication, Possession',
    ship: 'None',
    status: 'Program' 
  },
  { 
    id: '5', 
    name: 'Cypher', 
    role: 'Operator', 
    ability: 'Matrix Monitoring',
    ship: 'Nebuchadnezzar',
    status: 'Traitor' 
  },
  { 
    id: '6', 
    name: 'Oracle', 
    role: 'Guide', 
    ability: 'Foresight',
    ship: 'None',
    status: 'Program' 
  },
  { 
    id: '7', 
    name: 'Niobe', 
    role: 'Captain', 
    ability: 'Piloting, Combat',
    ship: 'Logos',
    status: 'Awakened' 
  },
  { 
    id: '8', 
    name: 'Tank', 
    role: 'Operator', 
    ability: 'Matrix Monitoring',
    ship: 'Nebuchadnezzar',
    status: 'Born Free' 
  }
];

const TableExample = () => {
  return (
  <div className="w-full max-w-4xl">
     <Table.Root>
            <Table.Head>
                <Table.Row>
                    {columns.map((column) => (
                        <Table.ColumnCellHeader key={column.id}>
                            {column.name}
                        </Table.ColumnCellHeader>
                    ))}
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {data.map((row) => (
                    <Table.Row key={row.id}>
                        {columns.map((column) => (
                            <Table.Cell key={`${row.id}-${column.id}`}>
                                {row[column.id]}
                            </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
  </div>)
}

export default TableExample;