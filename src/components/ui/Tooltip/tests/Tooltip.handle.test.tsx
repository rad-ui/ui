import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Tooltip from '../Tooltip';

const Cells = () => {
    const handle = React.useMemo(() => Tooltip.createHandle<string>(), []);
    return (
        <>
            {['Revenue', 'Costs'].map((label) => (
                <Tooltip.Trigger key={label} handle={handle} payload={label} delay={200}>{label}</Tooltip.Trigger>
            ))}
            <Tooltip.Root handle={handle}>
                {({ payload }) => <Tooltip.Content>About {String(payload)}</Tooltip.Content>}
            </Tooltip.Root>
        </>
    );
};

describe('Tooltip detached triggers', () => {
    beforeEach(() => { jest.useFakeTimers(); });
    afterEach(() => { jest.useRealTimers(); });

    test('hovering a detached trigger opens the shared tooltip with its payload', () => {
        render(<Cells />);
        fireEvent.mouseEnter(screen.getByText('Costs'));
        act(() => { jest.advanceTimersByTime(100); });
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        act(() => { jest.advanceTimersByTime(150); });
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveTextContent('About Costs');
        expect(screen.getByText('Costs')).toHaveAttribute('aria-describedby', tooltip.id);
        expect(screen.getByText('Revenue')).not.toHaveAttribute('aria-describedby');
    });

    test('leaving before the delay cancels it', () => {
        render(<Cells />);
        fireEvent.mouseEnter(screen.getByText('Revenue'));
        fireEvent.mouseLeave(screen.getByText('Revenue'));
        act(() => { jest.advanceTimersByTime(500); });
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    test('focus opens at once and blur closes', () => {
        render(<Cells />);
        act(() => { screen.getByText('Revenue').focus(); });
        expect(screen.getByRole('tooltip')).toHaveTextContent('About Revenue');
        act(() => { screen.getByText('Revenue').blur(); });
        act(() => { jest.advanceTimersByTime(10); });
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    test('Escape closes it', () => {
        render(<Cells />);
        act(() => { screen.getByText('Costs').focus(); });
        fireEvent.keyDown(document.activeElement as Element, { key: 'Escape' });
        act(() => { jest.advanceTimersByTime(10); });
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    test('moving the pointer off the trigger closes it', () => {
        render(<Cells />);
        const costs = screen.getByText('Costs');
        fireEvent.mouseEnter(costs);
        act(() => { jest.advanceTimersByTime(250); });
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        fireEvent.mouseLeave(costs);
        act(() => { jest.advanceTimersByTime(50); });
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
});
