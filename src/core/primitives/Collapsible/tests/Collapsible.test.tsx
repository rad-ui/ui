import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CollapsiblePrimitive from '../';

describe('CollapsiblePrimitive', () => {
    test('renders children correctly', () => {
        render(
            <CollapsiblePrimitive.Root>
                <div data-testid="collapsible-child">Collapsible Content</div>
            </CollapsiblePrimitive.Root>
        );

        expect(screen.getByTestId('collapsible-child')).toBeInTheDocument();
        expect(screen.getByTestId('collapsible-child')).toHaveTextContent('Collapsible Content');
    });

    test('has correct data-state attribute based on open state', () => {
        const { rerender } = render(
            <CollapsiblePrimitive.Root data-testid="collapsible">
                <div>Content</div>
            </CollapsiblePrimitive.Root>
        );

        expect(screen.getByTestId('collapsible')).toHaveAttribute('data-state', 'closed');

        rerender(
            <CollapsiblePrimitive.Root data-testid="collapsible" open={true}>
                <div>Content</div>
            </CollapsiblePrimitive.Root>
        );

        expect(screen.getByTestId('collapsible')).toHaveAttribute('data-state', 'open');
    });

    test('disabled state renders properly', () => {
        render(
            <CollapsiblePrimitive.Root data-testid="collapsible" disabled>
                <div>Content</div>
            </CollapsiblePrimitive.Root>
        );

        expect(screen.getByTestId('collapsible')).toHaveAttribute('data-disabled', '');
    });

    test('CollapsibleContent renders with correct attributes', () => {
        const { rerender } = render(
            <CollapsiblePrimitive.Content data-testid="content" open={false}>
                <div>Hidden Content</div>
            </CollapsiblePrimitive.Content>
        );

        expect(screen.getByTestId('content')).toHaveAttribute('data-state', 'closed');
        expect(screen.getByTestId('content')).toHaveAttribute('aria-hidden', 'true');

        rerender(
            <CollapsiblePrimitive.Content data-testid="content" open={true}>
                <div>Visible Content</div>
            </CollapsiblePrimitive.Content>
        );

        expect(screen.getByTestId('content')).toHaveAttribute('data-state', 'open');
        expect(screen.getByTestId('content')).toHaveAttribute('aria-hidden', 'false');
    });

    test('onOpenChange callback is called when controlled', () => {
        const onOpenChangeMock = jest.fn();
        const TestComponent = () => {
            const [isOpen, setIsOpen] = React.useState(false);
            return (
                <CollapsiblePrimitive.Root
                    open={isOpen}
                    onOpenChange={(newOpen) => {
                        onOpenChangeMock(newOpen);
                        setIsOpen(newOpen);
                    }}
                >
                    <CollapsiblePrimitive.Trigger
                        data-testid="toggle-button"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        Toggle
                    </CollapsiblePrimitive.Trigger>
                    <CollapsiblePrimitive.Content open={isOpen} data-testid="content">
                        <div>Content</div>
                    </CollapsiblePrimitive.Content>
                </CollapsiblePrimitive.Root>
            );
        };

        render(<TestComponent />);

        // Initial state
        expect(screen.getByTestId('content')).toHaveAttribute('data-state', 'closed');

        // Toggle open
        fireEvent.click(screen.getByTestId('toggle-button'));
        expect(onOpenChangeMock).toHaveBeenCalledWith(true);
        expect(screen.getByTestId('content')).toHaveAttribute('data-state', 'open');

        // Toggle closed
        fireEvent.click(screen.getByTestId('toggle-button'));
        expect(onOpenChangeMock).toHaveBeenCalledWith(false);
        expect(screen.getByTestId('content')).toHaveAttribute('data-state', 'closed');
    });

    test('works in uncontrolled mode with defaultOpen prop', () => {
        render(
            <CollapsiblePrimitive.Root defaultOpen={true} data-testid="collapsible">
                <div>Content</div>
            </CollapsiblePrimitive.Root>
        );

        expect(screen.getByTestId('collapsible')).toHaveAttribute('data-state', 'open');
    });

    test('Trigger element renders correctly', () => {
        render(
            <CollapsiblePrimitive.Trigger data-testid="trigger">
                Toggle
            </CollapsiblePrimitive.Trigger>
        );

        expect(screen.getByTestId('trigger')).toBeInTheDocument();
        expect(screen.getByTestId('trigger')).toHaveTextContent('Toggle');
        expect(screen.getByTestId('trigger')).toHaveAttribute('type'); // Should have a type attribute
        expect(screen.getByTestId('trigger')).toHaveAttribute('aria-controls', 'collapsible-content');
    });
});
