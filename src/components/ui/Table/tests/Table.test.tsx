import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import Table from '../Table';

describe('Table Component', () => {
    const employeeData = [
        { id: 1, fullName: 'John Smith', age: 23, isIntern: false },
        { id: 2, fullName: 'Anna Donie', age: 35, isIntern: true },
        { id: 3, fullName: 'Hannah Brown', age: 20, isIntern: true },
        { id: 4, fullName: 'Johnathan White Jr', age: 36, isIntern: false },
    ];

    const employeeKey = [
        { key: 1, name: 'Employee Id' },
        { key: 2, name: 'Full Name' },
        { key: 3, name: 'Age' },
        { key: 4, name: 'In Internship' },
    ];

    let result: RenderResult;
    let container: HTMLElement;

    beforeEach(() => {
        result = render(
            <Table columns={employeeKey} data={employeeData}></Table>
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
                cell.textContent = Object.values(employeeData[rowIndex])[
                    cellIndex
                ].toString();
            });
        });
    });
});
