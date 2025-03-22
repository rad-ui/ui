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

    test('works in uncontrolled mode with defaultOpen prop', () => {
        render(
            <CollapsiblePrimitive.Root defaultOpen={true} data-testid="collapsible">
                <CollapsiblePrimitive.Content data-testid="content">
                    <div>Content</div>
                </CollapsiblePrimitive.Content>
            </CollapsiblePrimitive.Root>
        );

        expect(screen.getByTestId('collapsible')).toHaveAttribute('data-state', 'open');
        expect(screen.getByTestId('content')).toHaveAttribute('data-state', 'open');
    });

    test('Trigger element renders with correct accessibility attributes', () => {
        render(
            <CollapsiblePrimitive.Root>
                <CollapsiblePrimitive.Trigger data-testid="trigger">
                    Toggle
                </CollapsiblePrimitive.Trigger>
                <CollapsiblePrimitive.Content>
                    Content
                </CollapsiblePrimitive.Content>
            </CollapsiblePrimitive.Root>
        );

        expect(screen.getByTestId('trigger')).toBeInTheDocument();
        expect(screen.getByTestId('trigger')).toHaveTextContent('Toggle');
        expect(screen.getByTestId('trigger')).toHaveAttribute('aria-expanded', 'false');
        expect(screen.getByTestId('trigger')).toHaveAttribute('aria-controls');
    });
});
