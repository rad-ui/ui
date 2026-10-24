import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NumberField from '../NumberField';

const Example = (props: Partial<React.ComponentProps<typeof NumberField.Root>> & { direction?: 'horizontal' | 'vertical' }) => {
    const { direction, ...rootProps } = props;
    return (
        <NumberField.Root defaultValue={10} {...rootProps}>
            <NumberField.ScrubArea direction={direction}>Width</NumberField.ScrubArea>
            <NumberField.Input aria-label="Width" />
        </NumberField.Root>
    );
};

const drag = (area: HTMLElement, moves: Array<{ x?: number; y?: number; shiftKey?: boolean }>) => {
    fireEvent.pointerDown(area, { button: 0, pointerId: 1, clientX: 0, clientY: 0 });
    moves.forEach(({ x = 0, y = 0, shiftKey = false }) => {
        fireEvent.pointerMove(area, { pointerId: 1, clientX: x, clientY: y, shiftKey });
    });
    fireEvent.pointerUp(area, { pointerId: 1 });
};

describe('NumberField.ScrubArea', () => {
    test('dragging right increments by one step per 2px', () => {
        render(<Example />);
        const area = screen.getByText('Width', { selector: 'span' });
        drag(area, [{ x: 3 }, { x: 10 }]);
        expect(screen.getByRole('spinbutton', { name: 'Width' })).toHaveValue(15);
    });

    test('dragging left decrements and respects min', () => {
        render(<Example min={8} />);
        const area = screen.getByText('Width', { selector: 'span' });
        drag(area, [{ x: -20 }]);
        expect(screen.getByRole('spinbutton', { name: 'Width' })).toHaveValue(8);
    });

    test('vertical scrubbing increments when moving up', () => {
        render(<Example direction="vertical" />);
        const area = screen.getByText('Width', { selector: 'span' });
        drag(area, [{ y: -4 }]);
        expect(screen.getByRole('spinbutton', { name: 'Width' })).toHaveValue(12);
    });

    test('shift uses the large step', () => {
        render(<Example />);
        const area = screen.getByText('Width', { selector: 'span' });
        drag(area, [{ x: 2, shiftKey: true }]);
        expect(screen.getByRole('spinbutton', { name: 'Width' })).toHaveValue(20);
    });

    test('marks itself while scrubbing and stops on pointer up', () => {
        const onValueChange = jest.fn();
        render(<Example onValueChange={onValueChange} />);
        const area = screen.getByText('Width', { selector: 'span' });
        fireEvent.pointerDown(area, { button: 0, pointerId: 1, clientX: 0 });
        expect(area).toHaveAttribute('data-scrubbing');
        fireEvent.pointerUp(area, { pointerId: 1 });
        expect(area).not.toHaveAttribute('data-scrubbing');
        fireEvent.pointerMove(area, { pointerId: 1, clientX: 50 });
        expect(onValueChange).not.toHaveBeenCalled();
    });

    test('does nothing when disabled or read-only', () => {
        const { unmount } = render(<Example disabled />);
        drag(screen.getByText('Width', { selector: 'span' }), [{ x: 20 }]);
        expect(screen.getByRole('spinbutton', { name: 'Width' })).toHaveValue(10);
        unmount();
        render(<Example readOnly />);
        drag(screen.getByText('Width', { selector: 'span' }), [{ x: 20 }]);
        expect(screen.getByRole('spinbutton', { name: 'Width' })).toHaveValue(10);
    });
});
