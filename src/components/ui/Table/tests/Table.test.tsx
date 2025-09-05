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

    it('forwards refs to DOM elements', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const headRef = React.createRef<HTMLTableSectionElement>();
        const bodyRef = React.createRef<HTMLTableSectionElement>();
        const rowRef = React.createRef<HTMLTableRowElement>();
        const cellRef = React.createRef<HTMLTableCellElement>();
        const headerRef = React.createRef<HTMLTableCellElement>();

        render(
            <Table.Root ref={rootRef}>
                <Table.Head ref={headRef}>
                    <Table.Row ref={rowRef}>
                        <Table.ColumnCellHeader ref={headerRef}>Header</Table.ColumnCellHeader>
                    </Table.Row>
                </Table.Head>
                <Table.Body ref={bodyRef}>
                    <Table.Row>
                        <Table.Cell ref={cellRef}>Cell</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(headRef.current).toBeInstanceOf(HTMLTableSectionElement);
        expect(bodyRef.current).toBeInstanceOf(HTMLTableSectionElement);
        expect(rowRef.current).toBeInstanceOf(HTMLTableRowElement);
        expect(cellRef.current).toBeInstanceOf(HTMLTableCellElement);
        expect(headerRef.current).toBeInstanceOf(HTMLTableCellElement);
    });

    it('renders without warnings', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        render(
            <Table.Root>
                <Table.Head>
                    <Table.Row>
                        <Table.ColumnCellHeader>Header</Table.ColumnCellHeader>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();

        warnSpy.mockRestore();
        errorSpy.mockRestore();
    });

    it('provides ColumnHeader alias', () => {
        expect(Table.ColumnHeader).toBe(Table.ColumnCellHeader);
    });
});
