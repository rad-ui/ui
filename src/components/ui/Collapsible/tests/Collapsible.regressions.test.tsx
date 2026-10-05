import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Collapsible from '../Collapsible';

describe('Collapsible regressions', () => {
    test('disabled root disables the trigger button', async() => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();
        render(
            <Collapsible.Root disabled onOpenChange={onOpenChange}>
                <Collapsible.Trigger>Toggle</Collapsible.Trigger>
                <Collapsible.Content>Content</Collapsible.Content>
            </Collapsible.Root>
        );
        const trigger = screen.getByRole('button', { name: 'Toggle' });
        expect(trigger).toBeDisabled();
        expect(trigger).toHaveAttribute('aria-disabled', 'true');
        await user.click(trigger);
        expect(onOpenChange).not.toHaveBeenCalled();
    });

    test('open animated content is not collapsed by unrelated parent re-renders', () => {
        jest.useFakeTimers();
        try {
            const Harness = ({ tick }: { tick: number }) => (
                <Collapsible.Root defaultOpen transitionDuration={200}>
                    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
                    <Collapsible.Content data-testid="content"><span>render {tick}</span></Collapsible.Content>
                </Collapsible.Root>
            );
            const { rerender } = render(<Harness tick={0} />);
            jest.advanceTimersByTime(500);
            const content = screen.getByTestId('content');
            expect(content.style.height).toBe('');
            rerender(<Harness tick={1} />);
            expect(content.style.height).toBe('');
            jest.advanceTimersByTime(50);
            expect(content.style.height).toBe('');
            expect(content).toHaveTextContent('render 1');
        } finally {
            jest.useRealTimers();
        }
    });
});
