import React from 'react';
import { render, RenderResult } from '@testing-library/react';

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
    let container: HTMLElement;

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
        container = result.container;
    });

    it('renders without crashing', () => {
        const tableElements = container.querySelectorAll('table');
        expect(tableElements.length).toEqual(1);
        expect(tableElements[0]).toBeTruthy();
    });

    it('renders correct user defined headers', () => {
        const headerRows = container.querySelectorAll('table thead tr');
        expect(headerRows.length).toEqual(1);

        const headers = headerRows[0].querySelectorAll('th');
        expect(headers.length).toEqual(4);

        headers.forEach((header, index) => {
            expect(header.textContent).toEqual(employeeKey[index].name);
        });
    });

    it('renders correct user defined data', () => {
        const tbodyElements = container.querySelectorAll('tbody');
        expect(tbodyElements.length).toEqual(1);

        const dataRows = tbodyElements[0].querySelectorAll('tr');
        expect(dataRows.length).toEqual(4);

        dataRows.forEach((row, rowIndex) => {
            const dataCells = row.querySelectorAll('td');
            expect(dataCells.length).toEqual(4);

            dataCells.forEach((cell, cellIndex) => {
                expect(cell.textContent).toEqual(
                    Object.values(employeeData[rowIndex])[cellIndex].toString()
                );
            });
        });
    });
});
