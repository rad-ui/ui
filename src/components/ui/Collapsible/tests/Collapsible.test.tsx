import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Collapsible from '../Collapsible';

// Mock the animations
jest.mock('~/core/hooks/useControllableState', () => {
    return jest.fn((controlled: any, defaultValue: any, onChange?: (value: any) => void) => {
        const [state, setState] = React.useState(defaultValue);

        React.useEffect(() => {
            if (controlled !== undefined) {
                setState(controlled);
            }
        }, [controlled]);

        const handleChange = (value: any) => {
            setState(value);
            onChange?.(value);
        };

        return [state, handleChange];
    });
});

describe('Collapsible Component', () => {
    it('renders without crashing', () => {
        const { getByText } = render(
            <Collapsible.Root defaultOpen>
                <Collapsible.Trigger>Test Title</Collapsible.Trigger>
                <Collapsible.Content>
                    <div>Test Content</div>
                </Collapsible.Content>
            </Collapsible.Root>
        );
        expect(getByText('Test Title')).toBeInTheDocument();
        expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('does not toggle content visibility when disabled', () => {
        const onOpenChange = jest.fn();

        render(
            <Collapsible.Root disabled defaultOpen onOpenChange={onOpenChange}>
                <Collapsible.Trigger>Toggle</Collapsible.Trigger>
                <Collapsible.Content>
                    <div>Test Content</div>
                </Collapsible.Content>
            </Collapsible.Root>
        );

        const triggerButton = screen.getByText('Toggle');
        fireEvent.click(triggerButton);

        // Verify onOpenChange was not called when disabled
        expect(onOpenChange).not.toHaveBeenCalled();

        // Content should still be visible when disabled
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('supports controlled open state', () => {
        const onOpenChange = jest.fn();

        const { rerender } = render(
            <Collapsible.Root open={false} onOpenChange={onOpenChange}>
                <Collapsible.Trigger>Toggle</Collapsible.Trigger>
                <Collapsible.Content>
                    <div>Test Content</div>
                </Collapsible.Content>
            </Collapsible.Root>
        );

        // Content should not be rendered when closed
        expect(screen.queryByText('Test Content')).not.toBeInTheDocument();

        // Trigger click should call onOpenChange
        const triggerButton = screen.getByText('Toggle');
        fireEvent.click(triggerButton);
        expect(onOpenChange).toHaveBeenCalledWith(true);

        // Simulate parent controlling component and opening the collapsible
        rerender(
            <Collapsible.Root open={true} onOpenChange={onOpenChange}>
                <Collapsible.Trigger>Toggle</Collapsible.Trigger>
                <Collapsible.Content>
                    <div>Test Content</div>
                </Collapsible.Content>
            </Collapsible.Root>
        );

        // Content should now be visible
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
});

describe('Collapsible.Trigger Component', () => {
    it('renders the trigger content', () => {
        render(
            <Collapsible.Root>
                <Collapsible.Trigger>Trigger Content</Collapsible.Trigger>
            </Collapsible.Root>
        );
        expect(screen.getByText('Trigger Content')).toBeInTheDocument();
    });

    it('has correct ARIA attributes', () => {
        render(
            <Collapsible.Root defaultOpen>
                <Collapsible.Trigger>Trigger</Collapsible.Trigger>
                <Collapsible.Content>Content</Collapsible.Content>
            </Collapsible.Root>
        );

        const trigger = screen.getByText('Trigger');
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        expect(trigger).toHaveAttribute('aria-controls');
    });
});

describe('Collapsible.Content Component', () => {
    it('renders the content when open', () => {
        render(
            <Collapsible.Root defaultOpen>
                <Collapsible.Content>Content Text</Collapsible.Content>
            </Collapsible.Root>
        );
        expect(screen.getByText('Content Text')).toBeInTheDocument();
    });

    it('has correct ARIA attributes', () => {
        render(
            <Collapsible.Root defaultOpen>
                <Collapsible.Trigger>Trigger</Collapsible.Trigger>
                <Collapsible.Content>Content</Collapsible.Content>
            </Collapsible.Root>
        );

        const content = screen.getByText('Content');
        expect(content).toHaveAttribute('aria-hidden', 'false');
    });
});
