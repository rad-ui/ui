import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Slot, { mergeProps, composeRefs } from '../Slot';

describe('mergeProps', () => {
    test('later props win, classes join and styles merge', () => {
        const merged = mergeProps(
            { id: 'a', className: 'one', style: { color: 'red', margin: 1 } },
            { id: 'b', className: 'two', style: { color: 'blue' } }
        );
        expect(merged.id).toBe('b');
        expect(merged.className).toBe('one two');
        expect(merged.style).toEqual({ color: 'blue', margin: 1 });
    });

    test('handlers chain rightmost first', () => {
        const calls: string[] = [];
        const merged = mergeProps(
            { onClick: () => calls.push('left') },
            { onClick: () => calls.push('middle') },
            { onClick: () => calls.push('right') }
        );
        merged.onClick({ defaultPrevented: false });
        expect(calls).toEqual(['right', 'middle', 'left']);
    });

    test('preventDefault in a later handler skips the earlier ones', () => {
        const left = jest.fn();
        const merged = mergeProps(
            { onClick: left },
            { onClick: (event: { defaultPrevented: boolean }) => { event.defaultPrevented = true; } }
        );
        merged.onClick({ defaultPrevented: false });
        expect(left).not.toHaveBeenCalled();
    });

    test('skips empty entries', () => {
        expect(mergeProps({ a: 1 }, undefined as never, { b: 2 })).toEqual({ a: 1, b: 2 });
    });
});

describe('composeRefs', () => {
    test('fans one node out to callback and object refs', () => {
        const objectRef = React.createRef<HTMLDivElement>();
        const callback = jest.fn();
        render(<div ref={composeRefs(objectRef, callback)} data-testid="node" />);
        expect(objectRef.current).toBe(screen.getByTestId('node'));
        expect(callback).toHaveBeenCalledWith(screen.getByTestId('node'));
    });
});

describe('Slot', () => {
    test('merges props and ref onto its child', () => {
        const ref = React.createRef<HTMLElement>();
        const onClickSlot = jest.fn();
        const onClickChild = jest.fn();
        render(
            <Slot ref={ref} className="slot" onClick={onClickSlot} aria-label="Go">
                <a href="#x" className="child" onClick={onClickChild}>Link</a>
            </Slot>
        );
        const link = screen.getByRole('link', { name: 'Go' });
        expect(link).toHaveClass('slot', 'child');
        expect(ref.current).toBe(link);
        fireEvent.click(link);
        expect(onClickChild).toHaveBeenCalled();
        expect(onClickSlot).toHaveBeenCalled();
    });
});
