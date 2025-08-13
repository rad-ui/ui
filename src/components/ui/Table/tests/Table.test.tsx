import React from 'react';
import { render, RenderResult, within } from '@testing-library/react';

import Table from '../Table';

describe('Table Component', () => {
    const employeeData = [
        { id: 1, fullName: 'John Smith', age: 23, isIntern: 'No' },
        { id: 2, fullName: 'Anna Donie', age: 35, isIntern: 'Yes' },
        { id: 3, fullName: 'Hannah Brown', age: 20, isIntern: 'Yes' },
        { id: 4, fullName: 'Johnathan White Jr', age: 36, isIntern: 'No' }
    ];

    const employeeKey = [
        { id: 'id', name: 'Employee Id' },
        { id: 'fullName', name: 'Full Name' },
        { id: 'age', name: 'Age' },
        { id: 'isIntern', name: 'In Internship' }
    ];

    let result: RenderResult;

    beforeEach(() => {
        result = render(
            <Table.Root>
                <Table.Head>
                    <Table.Row>
                        {employeeKey.map((column) => (
                            <Table.ColumnCellHeader key={column.id}>
                                {column.name}
                            </Table.ColumnCellHeader>
                        ))}
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {employeeData.map((row) => (
                        <Table.Row key={row.id}>
                            {employeeKey.map((column) => (
                                <Table.Cell key={`${row.id}-${column.id}`}>
                                    {String(row[column.id as keyof typeof row])}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        );
    });

    it('renders without crashing', () => {
        const tableElements = result.getAllByRole('table');
        expect(tableElements.length).toEqual(1);
        expect(tableElements[0]).toBeTruthy();
    });

    it('renders correct user defined headers', () => {
        const table = result.getByRole('table');
        const headerRowGroup = within(table).getAllByRole('rowgroup')[0];
        const headerRows = within(headerRowGroup).getAllByRole('row');
        expect(headerRows.length).toEqual(1);

        const headers = within(headerRows[0]).getAllByRole('columnheader');
        expect(headers.length).toEqual(4);

        headers.forEach((header, index) => {
            expect(header.textContent).toEqual(employeeKey[index].name);
        });
    });

    it('renders correct user defined data', () => {
        const table = result.getByRole('table');
        const rowGroups = within(table).getAllByRole('rowgroup');
        expect(rowGroups.length).toEqual(2);

        const dataRows = within(rowGroups[1]).getAllByRole('row');
        expect(dataRows.length).toEqual(4);

        dataRows.forEach((row, rowIndex) => {
            const dataCells = within(row).getAllByRole('cell');
            expect(dataCells.length).toEqual(4);

            dataCells.forEach((cell, cellIndex) => {
                expect(cell.textContent).toEqual(
                    Object.values(employeeData[rowIndex])[cellIndex].toString()
                );
            });
        });
    });
});
