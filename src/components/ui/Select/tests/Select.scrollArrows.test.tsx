import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Select from '../Select';

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew'];

const renderOpen = () => render(
    <Select.Root defaultOpen>
        <Select.Trigger>Fruit</Select.Trigger>
        <Select.Content data-testid="content">
            <Select.ScrollUpArrow data-testid="up" />
            {FRUITS.map((fruit) => <Select.Item key={fruit} value={fruit}>{fruit}</Select.Item>)}
            <Select.ScrollDownArrow data-testid="down" />
        </Select.Content>
    </Select.Root>
);

const makeScrollable = (node: HTMLElement, scrollHeight = 400, clientHeight = 100) => {
    Object.defineProperty(node, 'scrollHeight', { configurable: true, value: scrollHeight });
    Object.defineProperty(node, 'clientHeight', { configurable: true, value: clientHeight });
};

describe('Select scroll arrows', () => {
    afterEach(() => { jest.useRealTimers(); });

    test('render nothing while the list fits', () => {
        renderOpen();
        expect(screen.queryByTestId('up')).not.toBeInTheDocument();
        expect(screen.queryByTestId('down')).not.toBeInTheDocument();
    });

    test('show only the directions the list can scroll', () => {
        renderOpen();
        const content = screen.getByTestId('content');
        makeScrollable(content);
        fireEvent.scroll(content);
        expect(screen.queryByTestId('up')).not.toBeInTheDocument();
        expect(screen.getByTestId('down')).toHaveAttribute('aria-hidden', 'true');

        content.scrollTop = 150;
        fireEvent.scroll(content);
        expect(screen.getByTestId('up')).toHaveAttribute('data-direction', 'up');
        expect(screen.getByTestId('down')).toBeInTheDocument();

        content.scrollTop = 300;
        fireEvent.scroll(content);
        expect(screen.getByTestId('up')).toBeInTheDocument();
        expect(screen.queryByTestId('down')).not.toBeInTheDocument();
    });

    test('resting the pointer on an arrow scrolls until the edge, then stops', () => {
        jest.useFakeTimers();
        renderOpen();
        const content = screen.getByTestId('content');
        makeScrollable(content, 140, 100);
        fireEvent.scroll(content);
        fireEvent.pointerEnter(screen.getByTestId('down'));
        act(() => { jest.advanceTimersByTime(30); });
        expect(content.scrollTop).toBe(16);
        // jsdom doesn't clamp scrollTop (a browser stops at 40); either way the timer stops at the edge.
        act(() => { jest.advanceTimersByTime(30 * 5); });
        const atEdge = content.scrollTop;
        expect(atEdge).toBeGreaterThanOrEqual(40);
        act(() => { jest.advanceTimersByTime(300); });
        expect(content.scrollTop).toBe(atEdge);
        fireEvent.scroll(content);
        expect(screen.queryByTestId('down')).not.toBeInTheDocument();
    });

    test('leaving the arrow stops scrolling', () => {
        jest.useFakeTimers();
        renderOpen();
        const content = screen.getByTestId('content');
        makeScrollable(content);
        fireEvent.scroll(content);
        const down = screen.getByTestId('down');
        fireEvent.pointerEnter(down);
        act(() => { jest.advanceTimersByTime(60); });
        fireEvent.pointerLeave(down);
        const stoppedAt = content.scrollTop;
        act(() => { jest.advanceTimersByTime(300); });
        expect(content.scrollTop).toBe(stoppedAt);
    });

    test('forceMount keeps a hidden arrow rendered; custom children and refs work', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <Select.Root defaultOpen>
                <Select.Trigger>Fruit</Select.Trigger>
                <Select.Content>
                    <Select.ScrollUpArrow forceMount ref={ref}>▲</Select.ScrollUpArrow>
                    <Select.Item value="a">A</Select.Item>
                </Select.Content>
            </Select.Root>
        );
        expect(ref.current).toHaveAttribute('hidden');
        expect(ref.current).toHaveTextContent('▲');
    });
});
