import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Slider from '../Slider';

// @ts-ignore
if (typeof window !== 'undefined' && !window.PointerEvent) window.PointerEvent = MouseEvent;

const mockRect = (el: HTMLElement, rect: Partial<DOMRect>) => {
    el.getBoundingClientRect = () => ({ left: 0, top: 0, width: 100, height: 100, right: 100, bottom: 100, x: 0, y: 0, toJSON: () => {}, ...rect } as DOMRect);
};

describe('Slider audit fixes', () => {
    test('keyboard: range thumbs cannot cross', () => {
        const onValueChange = jest.fn();
        render(<Slider aria-label="Price" defaultValue={[20, 30]} step={5} onValueChange={onValueChange} />);
        const [lower, upper] = screen.getAllByRole('slider');
        lower.focus();
        for (let i = 0; i < 5; i++) fireEvent.keyDown(lower, { key: 'ArrowRight' });
        expect(lower).toHaveAttribute('aria-valuenow', '30');
        fireEvent.keyDown(lower, { key: 'End' });
        expect(lower).toHaveAttribute('aria-valuenow', '30');
        fireEvent.keyDown(upper, { key: 'Home' });
        expect(upper).toHaveAttribute('aria-valuenow', '30');
        expect(onValueChange).toHaveBeenLastCalledWith([30, 30]);
    });

    test('keyboard: decimal steps have no floating point noise', () => {
        const onValueChange = jest.fn();
        render(<Slider aria-label="Opacity" defaultValue={0} min={0} max={1} step={0.1} onValueChange={onValueChange} />);
        const thumb = screen.getByRole('slider');
        for (let i = 0; i < 3; i++) fireEvent.keyDown(thumb, { key: 'ArrowRight' });
        expect(thumb).toHaveAttribute('aria-valuenow', '0.3');
        expect(onValueChange).toHaveBeenLastCalledWith(0.3);
    });

    test('keyboard: onValueCommit fires for keyboard changes, not for no-op keys', () => {
        const onValueCommit = jest.fn();
        render(<Slider aria-label="Volume" defaultValue={100} onValueCommit={onValueCommit} />);
        const thumb = screen.getByRole('slider');
        fireEvent.keyDown(thumb, { key: 'ArrowRight' });
        expect(onValueCommit).not.toHaveBeenCalled();
        fireEvent.keyDown(thumb, { key: 'ArrowLeft' });
        expect(onValueCommit).toHaveBeenCalledWith(99);
    });

    test('pointer: snaps to steps measured from min', () => {
        render(<Slider aria-label="Odd" data-testid="root" defaultValue={3} min={3} max={23} step={5} />);
        const root = screen.getByTestId('root');
        mockRect(root, {});
        fireEvent.pointerDown(root, { clientX: 40, button: 0 });
        // raw = 3 + 0.4 * 20 = 11 -> nearest of 3, 8, 13, 18, 23 is 13 (8 is 3 away, 13 is 2 away)
        expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '13');
        fireEvent.pointerUp(document);
    });

    test('pointer: dragging a range thumb stops at its neighbour and keeps focus/index', () => {
        const onValueChange = jest.fn();
        const onValueCommit = jest.fn();
        render(<Slider aria-label="Range" data-testid="root" defaultValue={[20, 60]} onValueChange={onValueChange} onValueCommit={onValueCommit} />);
        const root = screen.getByTestId('root');
        mockRect(root, {});
        const [lower, upper] = screen.getAllByRole('slider');
        fireEvent.pointerDown(lower, { clientX: 20, button: 0 });
        expect(lower).toHaveFocus();
        fireEvent.pointerMove(document, { clientX: 90 });
        expect(lower).toHaveAttribute('aria-valuenow', '60');
        expect(upper).toHaveAttribute('aria-valuenow', '60');
        fireEvent.pointerUp(document);
        expect(onValueCommit).toHaveBeenCalledWith([60, 60]);
    });

    test('pointer: track click moves and focuses the nearest thumb; stacked thumbs move by direction', () => {
        render(<Slider aria-label="Range" data-testid="root" defaultValue={[50, 50]} />);
        const root = screen.getByTestId('root');
        mockRect(root, {});
        const [lower, upper] = screen.getAllByRole('slider');
        fireEvent.pointerDown(root, { clientX: 80, button: 0 });
        fireEvent.pointerUp(document);
        expect(upper).toHaveAttribute('aria-valuenow', '80');
        expect(upper).toHaveFocus();
        fireEvent.pointerDown(root, { clientX: 10, button: 0 });
        fireEvent.pointerUp(document);
        expect(lower).toHaveAttribute('aria-valuenow', '10');
        expect(lower).toHaveFocus();
    });

    test('pointer: dragging stacked thumbs picks the thumb by drag direction', () => {
        render(<Slider aria-label="Range" data-testid="root" defaultValue={[50, 50]} />);
        const root = screen.getByTestId('root');
        mockRect(root, {});
        const [lower, upper] = screen.getAllByRole('slider');
        fireEvent.pointerDown(upper, { clientX: 50, button: 0 });
        fireEvent.pointerMove(document, { clientX: 30 });
        fireEvent.pointerUp(document);
        expect(lower).toHaveAttribute('aria-valuenow', '30');
        expect(upper).toHaveAttribute('aria-valuenow', '50');

        fireEvent.pointerDown(lower, { clientX: 30, button: 0 });
        fireEvent.pointerMove(document, { clientX: 50 });
        fireEvent.pointerUp(document);
        fireEvent.pointerDown(lower, { clientX: 50, button: 0 });
        fireEvent.pointerMove(document, { clientX: 70 });
        fireEvent.pointerUp(document);
        expect(lower).toHaveAttribute('aria-valuenow', '50');
        expect(upper).toHaveAttribute('aria-valuenow', '70');
    });

    test('pointer: vertical orientation measures from the bottom', () => {
        render(<Slider aria-label="V" data-testid="root" orientation="vertical" defaultValue={0} />);
        const root = screen.getByTestId('root');
        mockRect(root, { height: 200, bottom: 200 });
        fireEvent.pointerDown(root, { clientY: 50, button: 0 });
        fireEvent.pointerUp(document);
        expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '75');
    });

    test('pointer: disabled slider ignores pointer and keyboard', () => {
        const onValueChange = jest.fn();
        render(<Slider aria-label="D" data-testid="root" disabled defaultValue={10} onValueChange={onValueChange} />);
        const root = screen.getByTestId('root');
        mockRect(root, {});
        fireEvent.pointerDown(root, { clientX: 80, button: 0 });
        fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
        expect(onValueChange).not.toHaveBeenCalled();
        expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true');
    });

    test('form: hidden inputs only render with a name and submit each thumb', () => {
        const { container, rerender } = render(<form><Slider aria-label="A" defaultValue={[10, 20]} /></form>);
        expect(container.querySelectorAll('input[type="hidden"]')).toHaveLength(0);
        rerender(<form data-testid="f"><Slider aria-label="A" name="price" defaultValue={[10, 20]} /></form>);
        const data = new FormData(screen.getByTestId('f') as HTMLFormElement);
        expect(data.get('price[0]')).toBe('10');
        expect(data.get('price[1]')).toBe('20');
    });

    test('thumb props compose with internal handlers and positioning', () => {
        const onKeyDown = jest.fn();
        render(
            <Slider.Root defaultValue={10}>
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb aria-label="T" onKeyDown={onKeyDown} className="custom" style={{ color: 'red' }} />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        const thumb = screen.getByRole('slider');
        fireEvent.keyDown(thumb, { key: 'ArrowRight' });
        expect(onKeyDown).toHaveBeenCalled();
        expect(thumb).toHaveAttribute('aria-valuenow', '11');
        expect(thumb).toHaveClass('custom');
        expect(thumb.style.left).toContain('11%');
        expect(thumb.style.color).toBe('red');
    });
});
