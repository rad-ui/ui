import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Splitter from '../Splitter';

const renderSplitter = (rootProps: Record<string, unknown> = {}, panelProps: Array<Record<string, unknown>> = [{}, {}], handleProps: Record<string, unknown> = {}) => render(
    <Splitter.Root data-testid="root" {...rootProps}>
        <Splitter.Panel data-testid="p0" index={0} {...panelProps[0]}>A</Splitter.Panel>
        <Splitter.Handle index={0} {...handleProps} />
        <Splitter.Panel data-testid="p1" index={1} {...panelProps[1]}>B</Splitter.Panel>
    </Splitter.Root>
);

const layout = (rootWidth: number, handleWidth: number) => {
    const root = screen.getByTestId('root');
    const handle = screen.getByRole('separator');
    Object.defineProperty(root, 'clientWidth', { configurable: true, value: rootWidth });
    Object.defineProperty(handle, 'offsetWidth', { configurable: true, value: handleWidth });
    return { root, handle };
};

describe('Splitter interactions', () => {
    test('Panel minSize/maxSize props constrain resizing and are not forwarded to the DOM', () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        try {
            renderSplitter({}, [{ minSize: 20, maxSize: 70, customRootClass: 'x' }, {}], { customRootClass: 'x' });
            const handle = screen.getByRole('separator');

            expect(handle).toHaveAttribute('aria-valuemin', '20');
            expect(handle).toHaveAttribute('aria-valuemax', '70');

            fireEvent.keyDown(handle, { key: 'End' });
            expect(screen.getByTestId('p0')).toHaveStyle({ flexBasis: '70%' });
            fireEvent.keyDown(handle, { key: 'Home' });
            expect(screen.getByTestId('p0')).toHaveStyle({ flexBasis: '20%' });

            const p0 = screen.getByTestId('p0');
            expect(p0).not.toHaveAttribute('minsize');
            expect(p0).not.toHaveAttribute('customrootclass');
            expect(handle).not.toHaveAttribute('customrootclass');
            expect(errorSpy).not.toHaveBeenCalled();
        } finally {
            errorSpy.mockRestore();
        }
    });

    test('panels shrink to make room for handles instead of overflowing the root', () => {
        renderSplitter({ defaultSizes: [35, 65] });
        expect(screen.getByTestId('p0').style.flexShrink).toBe('1');
        expect(screen.getByTestId('p1').style.flexShrink).toBe('1');
    });

    test('drag maps pointer distance against the space left after handles', () => {
        const onSizesChange = jest.fn();
        renderSplitter({ onSizesChange });
        const { handle } = layout(410, 10); // 400px available for panels

        fireEvent.mouseDown(handle, { button: 0, clientX: 200 });
        fireEvent.mouseMove(document, { clientX: 240 });
        fireEvent.mouseUp(document);

        // 40px of 400px = 10%
        expect(onSizesChange).toHaveBeenLastCalledWith([60, 40]);
        expect(screen.getByTestId('p0')).toHaveStyle({ flexBasis: '60%' });
    });

    test('the final pointer position is applied on release even if a frame was pending', () => {
        const rafSpy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
        const cafSpy = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
        try {
            const onSizesChange = jest.fn();
            renderSplitter({ onSizesChange });
            const { handle } = layout(400, 0);

            fireEvent.mouseDown(handle, { button: 0, clientX: 200 });
            fireEvent.mouseMove(document, { clientX: 210 });
            fireEvent.mouseMove(document, { clientX: 300 }); // never flushed by rAF
            act(() => {
                fireEvent.mouseUp(document);
            });

            expect(onSizesChange).toHaveBeenCalledTimes(1);
            expect(onSizesChange).toHaveBeenCalledWith([75, 25]);
        } finally {
            rafSpy.mockRestore();
            cafSpy.mockRestore();
        }
    });

    test('a click without movement does not report a size change', () => {
        const onSizesChange = jest.fn();
        renderSplitter({ onSizesChange });
        const { handle } = layout(400, 0);
        fireEvent.mouseDown(handle, { button: 0, clientX: 200 });
        fireEvent.mouseUp(document);
        expect(onSizesChange).not.toHaveBeenCalled();
    });

    test('pressing the handle focuses it so keyboard resizing can follow', () => {
        renderSplitter();
        const handle = screen.getByRole('separator');
        fireEvent.mouseDown(handle, { button: 0, clientX: 200 });
        expect(handle).toHaveFocus();
        expect(handle).toHaveAttribute('data-dragging');
        fireEvent.mouseUp(document);
        expect(handle).not.toHaveAttribute('data-dragging');
    });

    test('unmounting mid-drag removes document listeners', () => {
        const removeSpy = jest.spyOn(document, 'removeEventListener');
        try {
            const { unmount } = renderSplitter();
            fireEvent.mouseDown(screen.getByRole('separator'), { button: 0, clientX: 200 });
            unmount();
            const removed = removeSpy.mock.calls.map(([type]) => type);
            expect(removed).toEqual(expect.arrayContaining(['mousemove', 'mouseup', 'touchmove', 'touchend']));
        } finally {
            removeSpy.mockRestore();
        }
    });

    test('consumer handlers on Handle are composed, and can opt out via preventDefault', () => {
        const onKeyDown = jest.fn();
        renderSplitter({}, [{}, {}], { onKeyDown });
        const handle = screen.getByRole('separator');

        fireEvent.keyDown(handle, { key: 'ArrowRight' });
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(handle).toHaveAttribute('aria-valuenow', '51');

        onKeyDown.mockImplementation((event: React.KeyboardEvent) => event.preventDefault());
        fireEvent.keyDown(handle, { key: 'ArrowRight' });
        expect(handle).toHaveAttribute('aria-valuenow', '51');
    });

    test('aria values are rounded for screen readers', () => {
        renderSplitter({ defaultSizes: [100 / 3, 200 / 3] });
        expect(screen.getByRole('separator')).toHaveAttribute('aria-valuenow', '33.3');
    });

    test('RTL mirrors horizontal arrow keys and drags', () => {
        const onSizesChange = jest.fn();
        renderSplitter({ dir: 'rtl', onSizesChange });
        const { root, handle } = layout(400, 0);
        expect(root).toHaveAttribute('dir', 'rtl');

        fireEvent.keyDown(handle, { key: 'ArrowLeft' });
        expect(handle).toHaveAttribute('aria-valuenow', '51');
        fireEvent.keyDown(handle, { key: 'ArrowRight' });
        expect(handle).toHaveAttribute('aria-valuenow', '50');

        // Dragging left grows the leading (right-hand) panel in RTL.
        fireEvent.mouseDown(handle, { button: 0, clientX: 200 });
        fireEvent.mouseMove(document, { clientX: 160 });
        act(() => { fireEvent.mouseUp(document); });
        expect(onSizesChange).toHaveBeenLastCalledWith([60, 40]);
    });

    test('vertical splitters ignore RTL for Up/Down', () => {
        renderSplitter({ dir: 'rtl', orientation: 'vertical' });
        const handle = screen.getByRole('separator');
        fireEvent.keyDown(handle, { key: 'ArrowDown' });
        expect(handle).toHaveAttribute('aria-valuenow', '51');
    });

    test('handle aria-controls points at its leading panel, including a consumer id', () => {
        const { rerender } = renderSplitter();
        const handle = screen.getByRole('separator');
        const p0 = screen.getByTestId('p0');
        expect(p0.id).toBeTruthy();
        expect(handle).toHaveAttribute('aria-controls', p0.id);

        rerender(
            <Splitter.Root data-testid="root">
                <Splitter.Panel data-testid="p0" id="sidebar" index={0}>A</Splitter.Panel>
                <Splitter.Handle index={0} />
                <Splitter.Panel data-testid="p1" index={1}>B</Splitter.Panel>
            </Splitter.Root>
        );
        expect(screen.getByTestId('p0')).toHaveAttribute('id', 'sidebar');
        expect(screen.getByRole('separator')).toHaveAttribute('aria-controls', 'sidebar');
    });

    test.each([
        ['Root', { disabled: true }, {}],
        ['Handle', {}, { disabled: true }]
    ])('%s disabled blocks keyboard and pointer resizing', (_label, rootProps, handleProps) => {
        const onSizesChange = jest.fn();
        renderSplitter({ ...rootProps, onSizesChange }, [{}, {}], handleProps);
        const { handle } = layout(400, 0);

        expect(handle).toHaveAttribute('aria-disabled', 'true');
        expect(handle).toHaveAttribute('data-disabled');
        expect(handle).toHaveAttribute('tabindex', '-1');

        fireEvent.keyDown(handle, { key: 'ArrowRight' });
        fireEvent.keyDown(handle, { key: 'End' });
        fireEvent.mouseDown(handle, { button: 0, clientX: 200 });
        fireEvent.mouseMove(document, { clientX: 300 });
        fireEvent.mouseUp(document);

        expect(handle).toHaveAttribute('aria-valuenow', '50');
        expect(handle).not.toHaveAttribute('data-dragging');
        expect(onSizesChange).not.toHaveBeenCalled();
    });
});
