import React from 'react';
import { render, RenderResult, within, fireEvent, screen } from '@testing-library/react';

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
});

describe('Table resizable columns', () => {
    const columns = [
        { id: 'name', name: 'Name' },
        { id: 'age', name: 'Age' }
    ];

    const data = [
        { id: '1', name: 'John Doe', age: 25 },
        { id: '2', name: 'Jane Doe', age: 24 }
    ];

    const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
    const originalOffsetWidthDescriptor = Object.getOwnPropertyDescriptor(
        HTMLTableElement.prototype,
        'offsetWidth'
    );

    beforeEach(() => {
        Element.prototype.getBoundingClientRect = jest.fn(() => ({
            width: 160,
            height: 40,
            top: 0,
            left: 0,
            bottom: 40,
            right: 160,
            x: 0,
            y: 0,
            toJSON: () => {}
        }));

        Object.defineProperty(HTMLTableElement.prototype, 'offsetWidth', {
            configurable: true,
            get: () => 400
        });
    });

    afterEach(() => {
        Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;

        if (originalOffsetWidthDescriptor) {
            Object.defineProperty(
                HTMLTableElement.prototype,
                'offsetWidth',
                originalOffsetWidthDescriptor
            );
        } else {
            delete (HTMLTableElement.prototype as { offsetWidth?: number }).offsetWidth;
        }
    });

    it('renders resize handles when resizable is enabled', () => {
        render(
            <Table.Root resizable>
                <Table.Head>
                    <Table.Row>
                        {columns.map((column, columnIndex) => (
                            <Table.ColumnCellHeader key={column.id} columnIndex={columnIndex}>
                                {column.name}
                                <Table.ColumnResizeHandle />
                            </Table.ColumnCellHeader>
                        ))}
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {data.map((row) => (
                        <Table.Row key={row.id}>
                            {columns.map((column, columnIndex) => (
                                <Table.Cell key={`${row.id}-${column.id}`} columnIndex={columnIndex}>
                                    {String(row[column.id as keyof typeof row])}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        );

        expect(screen.getAllByRole('separator')).toHaveLength(1);
    });

    it('does not render resize handles when resizable is disabled', () => {
        render(
            <Table.Root>
                <Table.Head>
                    <Table.Row>
                        {columns.map((column, columnIndex) => (
                            <Table.ColumnCellHeader key={column.id} columnIndex={columnIndex}>
                                {column.name}
                                <Table.ColumnResizeHandle />
                            </Table.ColumnCellHeader>
                        ))}
                    </Table.Row>
                </Table.Head>
            </Table.Root>
        );

        expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    });

    it('updates column width while dragging a resize handle', () => {
        const onColumnWidthsChange = jest.fn();

        render(
            <Table.Root
                resizable
                defaultColumnWidths={[160, 120]}
                onColumnWidthsChange={onColumnWidthsChange}
            >
                <Table.Head>
                    <Table.Row>
                        {columns.map((column, columnIndex) => (
                            <Table.ColumnCellHeader key={column.id} columnIndex={columnIndex}>
                                {column.name}
                                <Table.ColumnResizeHandle />
                            </Table.ColumnCellHeader>
                        ))}
                    </Table.Row>
                </Table.Head>
            </Table.Root>
        );

        const [firstHandle] = screen.getAllByRole('separator');

        fireEvent.mouseDown(firstHandle, { clientX: 100 });
        fireEvent.mouseMove(document, { clientX: 130 });
        fireEvent.mouseUp(document);

        expect(onColumnWidthsChange).toHaveBeenCalled();
        const latestWidths = onColumnWidthsChange.mock.calls.at(-1)?.[0];
        expect(latestWidths[0]).toBe(259);
        expect(latestWidths[1]).toBe(141);
    });

    it('clears resize state when a touch gesture is cancelled', () => {
        const { container } = render(
            <Table.Root resizable defaultColumnWidths={[160, 120]}>
                <Table.Head>
                    <Table.Row>
                        {columns.map((column, columnIndex) => (
                            <Table.ColumnCellHeader key={column.id} columnIndex={columnIndex}>
                                {column.name}
                                <Table.ColumnResizeHandle />
                            </Table.ColumnCellHeader>
                        ))}
                    </Table.Row>
                </Table.Head>
            </Table.Root>
        );

        const wrapper = container.querySelector('[data-resize-handle-visibility]');
        const [firstHandle] = screen.getAllByRole('separator');

        fireEvent.touchStart(firstHandle, { touches: [{ clientX: 100 }] });
        expect(wrapper).toHaveAttribute('data-resizing', '');

        fireEvent.touchCancel(document);
        expect(wrapper).not.toHaveAttribute('data-resizing');
    });

    it('removes document listeners when unmounted during a resize', () => {
        const removeListenerSpy = jest.spyOn(document, 'removeEventListener');

        const { unmount } = render(
            <Table.Root resizable defaultColumnWidths={[160, 120]}>
                <Table.Head>
                    <Table.Row>
                        {columns.map((column, columnIndex) => (
                            <Table.ColumnCellHeader key={column.id} columnIndex={columnIndex}>
                                {column.name}
                                <Table.ColumnResizeHandle />
                            </Table.ColumnCellHeader>
                        ))}
                    </Table.Row>
                </Table.Head>
            </Table.Root>
        );

        const [firstHandle] = screen.getAllByRole('separator');

        fireEvent.mouseDown(firstHandle, { clientX: 100 });
        unmount();

        expect(removeListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
        expect(removeListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
        expect(removeListenerSpy).toHaveBeenCalledWith('touchmove', expect.any(Function));
        expect(removeListenerSpy).toHaveBeenCalledWith('touchend', expect.any(Function));
        expect(removeListenerSpy).toHaveBeenCalledWith('touchcancel', expect.any(Function));

        removeListenerSpy.mockRestore();
    });

    it('applies scaled default column widths through colgroup', () => {
        const { container } = render(
            <Table.Root resizable defaultColumnWidths={[180, 96]}>
                <Table.Head>
                    <Table.Row>
                        {columns.map((column, columnIndex) => (
                            <Table.ColumnCellHeader key={column.id} columnIndex={columnIndex}>
                                {column.name}
                                <Table.ColumnResizeHandle />
                            </Table.ColumnCellHeader>
                        ))}
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {data.map((row) => (
                        <Table.Row key={row.id}>
                            {columns.map((column, columnIndex) => (
                                <Table.Cell key={`${row.id}-${column.id}`} columnIndex={columnIndex}>
                                    {String(row[column.id as keyof typeof row])}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        );

        const cols = container.querySelectorAll('col');

        expect(cols).toHaveLength(2);

        const firstWidth = Number.parseInt(cols[0].getAttribute('style')?.match(/width:\s*(\d+)px/)?.[1] ?? '0', 10);
        const secondWidth = Number.parseInt(cols[1].getAttribute('style')?.match(/width:\s*(\d+)px/)?.[1] ?? '0', 10);

        expect(firstWidth + secondWidth).toBe(400);
        expect(firstWidth).toBeGreaterThan(secondWidth);
    });

    it('reflects resize handle visibility on the table wrapper', () => {
        const { container: hoverContainer } = render(
            <Table.Root resizable>
                <Table.Head>
                    <Table.Row>
                        <Table.ColumnCellHeader columnIndex={0}>
                            Name
                            <Table.ColumnResizeHandle />
                        </Table.ColumnCellHeader>
                    </Table.Row>
                </Table.Head>
            </Table.Root>
        );

        const { container: alwaysContainer } = render(
            <Table.Root resizable resizeHandleVisibility="always">
                <Table.Head>
                    <Table.Row>
                        <Table.ColumnCellHeader columnIndex={0}>
                            Name
                            <Table.ColumnResizeHandle />
                        </Table.ColumnCellHeader>
                        <Table.ColumnCellHeader columnIndex={1}>
                            Age
                        </Table.ColumnCellHeader>
                    </Table.Row>
                </Table.Head>
            </Table.Root>
        );

        expect(hoverContainer.querySelector('[data-resize-handle-visibility]'))
            .toHaveAttribute('data-resize-handle-visibility', 'hover');
        expect(alwaysContainer.querySelector('[data-resize-handle-visibility]'))
            .toHaveAttribute('data-resize-handle-visibility', 'always');
        expect(alwaysContainer.querySelector('[data-slot="table-column-resize-handle"]'))
            .toHaveAttribute('data-resize-handle-visibility', 'always');
    });

    it('renders a resize handle for each non-last column', () => {
        render(
            <Table.Root resizable resizeHandleVisibility="always">
                <Table.Head>
                    <Table.Row>
                        {columns.map((column, columnIndex) => (
                            <Table.ColumnCellHeader key={column.id} columnIndex={columnIndex}>
                                {column.name}
                                <Table.ColumnResizeHandle />
                            </Table.ColumnCellHeader>
                        ))}
                        <Table.ColumnCellHeader columnIndex={2}>
                            Role
                        </Table.ColumnCellHeader>
                    </Table.Row>
                </Table.Head>
            </Table.Root>
        );

        expect(screen.getAllByRole('separator')).toHaveLength(2);
    });

    it('does not render a resize handle on the last column', () => {
        render(
            <Table.Root resizable defaultColumnWidths={[160, 120]}>
                <Table.Head>
                    <Table.Row>
                        {columns.map((column, columnIndex) => (
                            <Table.ColumnCellHeader key={column.id} columnIndex={columnIndex}>
                                {column.name}
                                <Table.ColumnResizeHandle />
                            </Table.ColumnCellHeader>
                        ))}
                    </Table.Row>
                </Table.Head>
            </Table.Root>
        );

        const headers = screen.getAllByRole('columnheader');
        expect(headers[1].querySelector('[data-slot="table-column-resize-handle"]')).toBeNull();
    });
});
