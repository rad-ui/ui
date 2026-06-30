import React from 'react';
import { render, RenderResult, screen, within } from '@testing-library/react';

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

    it('forwards refs to underlying DOM elements', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const headRef = React.createRef<HTMLTableSectionElement>();
        const bodyRef = React.createRef<HTMLTableSectionElement>();
        const rowRef = React.createRef<HTMLTableRowElement>();
        const columnHeaderRef = React.createRef<HTMLTableCellElement>();
        const cellRef = React.createRef<HTMLTableCellElement>();

        render(
            <Table.Root ref={rootRef}>
                <Table.Head ref={headRef}>
                    <Table.Row ref={rowRef}>
                        <Table.ColumnCellHeader ref={columnHeaderRef}>
                            Header
                        </Table.ColumnCellHeader>
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
        expect(columnHeaderRef.current).toBeInstanceOf(HTMLTableCellElement);
        expect(cellRef.current).toBeInstanceOf(HTMLTableCellElement);
    });

    it('supports asChild on table sections and cells', () => {
        const headRef = React.createRef<HTMLTableSectionElement>();
        const bodyRef = React.createRef<HTMLTableSectionElement>();
        const rowRef = React.createRef<HTMLTableRowElement>();
        const headerRef = React.createRef<HTMLTableCellElement>();
        const cellRef = React.createRef<HTMLTableCellElement>();

        render(
            <Table.Root>
                <Table.Head asChild ref={headRef}>
                    <thead data-testid="head">
                        <Table.Row asChild ref={rowRef}>
                            <tr data-testid="row">
                                <Table.ColumnCellHeader asChild ref={headerRef} scope="col">
                                    <th data-testid="header">Header</th>
                                </Table.ColumnCellHeader>
                            </tr>
                        </Table.Row>
                    </thead>
                </Table.Head>
                <Table.Body asChild ref={bodyRef}>
                    <tbody data-testid="body">
                        <Table.Row>
                            <Table.Cell asChild ref={cellRef}>
                                <td data-testid="cell">Cell</td>
                            </Table.Cell>
                        </Table.Row>
                    </tbody>
                </Table.Body>
            </Table.Root>
        );

        expect(headRef.current?.tagName).toBe('THEAD');
        expect(bodyRef.current?.tagName).toBe('TBODY');
        expect(rowRef.current?.tagName).toBe('TR');
        expect(headerRef.current?.getAttribute('scope')).toBe('col');
        expect(cellRef.current?.tagName).toBe('TD');
        expect(within(screen.getByTestId('head')).getByRole('row')).toBeInTheDocument();
        expect(within(screen.getByTestId('body')).getByRole('cell')).toHaveTextContent('Cell');
    });
});
