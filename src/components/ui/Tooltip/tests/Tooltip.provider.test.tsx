import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Tooltip from '../Tooltip';

const Pair = ({ itemDelay }: { itemDelay?: number }) => (
    <Tooltip.Provider openDelay={500} timeout={300}>
        <Tooltip.Root>
            <Tooltip.Trigger>First</Tooltip.Trigger>
            <Tooltip.Content>First hint</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root openDelay={itemDelay}>
            <Tooltip.Trigger>Second</Tooltip.Trigger>
            <Tooltip.Content>Second hint</Tooltip.Content>
        </Tooltip.Root>
    </Tooltip.Provider>
);

describe('Tooltip.Provider', () => {
    beforeEach(() => { jest.useFakeTimers(); });
    afterEach(() => { jest.useRealTimers(); });

    test('applies the provider openDelay to tooltips without their own delay', () => {
        render(<Pair />);
        fireEvent.mouseEnter(screen.getByText('First'));
        act(() => { jest.advanceTimersByTime(300); });
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        act(() => { jest.advanceTimersByTime(250); });
        expect(screen.getByRole('tooltip')).toHaveTextContent('First hint');
    });

    test('opens the next tooltip instantly while the group is warm', () => {
        render(<Pair />);
        fireEvent.mouseEnter(screen.getByText('First'));
        act(() => { jest.advanceTimersByTime(550); });
        expect(screen.getByRole('tooltip')).toHaveTextContent('First hint');

        fireEvent.mouseLeave(screen.getByText('First'));
        fireEvent.mouseEnter(screen.getByText('Second'));
        act(() => { jest.advanceTimersByTime(5); });
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveTextContent('Second hint');
        expect(tooltip).toHaveAttribute('data-instant');
        expect(screen.queryByText('First hint')).not.toBeInTheDocument();
    });

    test('waits the full delay again once the timeout has passed', () => {
        render(<Pair />);
        fireEvent.mouseEnter(screen.getByText('First'));
        act(() => { jest.advanceTimersByTime(550); });
        fireEvent.mouseLeave(screen.getByText('First'));
        act(() => { jest.advanceTimersByTime(1000); });
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

        fireEvent.mouseEnter(screen.getByText('Second'));
        act(() => { jest.advanceTimersByTime(100); });
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        act(() => { jest.advanceTimersByTime(450); });
        expect(screen.getByRole('tooltip')).toHaveTextContent('Second hint');
        expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-instant');
    });

    test('a tooltip keeps working outside a provider with no delay', () => {
        render(
            <Tooltip.Root>
                <Tooltip.Trigger>Alone</Tooltip.Trigger>
                <Tooltip.Content>Alone hint</Tooltip.Content>
            </Tooltip.Root>
        );
        fireEvent.mouseEnter(screen.getByText('Alone'));
        act(() => { jest.advanceTimersByTime(1); });
        expect(screen.getByRole('tooltip')).toHaveTextContent('Alone hint');
        expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-instant');
    });
});
