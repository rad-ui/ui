import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CollapsiblePrimitive from '../';

describe('CollapsiblePrimitive', () => {
    const originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;

    afterEach(() => {
        HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    });

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
                <CollapsiblePrimitive.Trigger data-testid="trigger">
                    Toggle
                </CollapsiblePrimitive.Trigger>
            </CollapsiblePrimitive.Root>
        );

        expect(screen.getByTestId('collapsible')).toHaveAttribute('data-state', 'closed');
        fireEvent.click(screen.getByTestId('trigger'));
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

    test('forwards refs correctly', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const triggerRef = React.createRef<HTMLButtonElement>();
        const contentRef = React.createRef<HTMLDivElement>();

        render(
            <CollapsiblePrimitive.Root ref={rootRef} data-testid="root" defaultOpen>
                <CollapsiblePrimitive.Trigger ref={triggerRef}>Toggle</CollapsiblePrimitive.Trigger>
                <CollapsiblePrimitive.Content ref={contentRef}>
                    Content
                </CollapsiblePrimitive.Content>
            </CollapsiblePrimitive.Root>
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
        // Content may be null initially if closed; ensure ref is a div when open
        expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
    });

    test('measures content on first open and exposes radix size variables', () => {
        HTMLElement.prototype.getBoundingClientRect = jest.fn(function(this: HTMLElement) {
            if (this.dataset.testid === 'content') {
                return {
                    width: 320,
                    height: 120,
                    top: 0,
                    left: 0,
                    right: 320,
                    bottom: 120,
                    x: 0,
                    y: 0,
                    toJSON: () => ({})
                } as DOMRect;
            }

            return {
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                x: 0,
                y: 0,
                toJSON: () => ({})
            } as DOMRect;
        });

        render(
            <CollapsiblePrimitive.Root>
                <CollapsiblePrimitive.Trigger data-testid="trigger">Toggle</CollapsiblePrimitive.Trigger>
                <CollapsiblePrimitive.Content data-testid="content">
                    <div>Measured Content</div>
                </CollapsiblePrimitive.Content>
            </CollapsiblePrimitive.Root>
        );

        fireEvent.click(screen.getByTestId('trigger'));

        const content = screen.getByTestId('content');

        expect(content.style.getPropertyValue('--radix-collapsible-content-height')).toBe('120px');
        expect(content.style.getPropertyValue('--radix-collapsible-content-width')).toBe('320px');
    });
    test('does not set inline height in steady open state when transitionDuration is 0', () => {
        HTMLElement.prototype.getBoundingClientRect = jest.fn(function(this: HTMLElement) {
            if (this.dataset.testid === 'content') {
                return {
                    width: 320,
                    height: 120,
                    top: 0,
                    left: 0,
                    right: 320,
                    bottom: 120,
                    x: 0,
                    y: 0,
                    toJSON: () => ({})
                } as DOMRect;
            }

            return {
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                x: 0,
                y: 0,
                toJSON: () => ({})
            } as DOMRect;
        });

        render(
            <CollapsiblePrimitive.Root transitionDuration={0} defaultOpen>
                <CollapsiblePrimitive.Content data-testid="content">
                    <div>Measured Content</div>
                </CollapsiblePrimitive.Content>
            </CollapsiblePrimitive.Root>
        );

        const content = screen.getByTestId('content');

        expect(content.style.height).toBe('');
        expect(content.style.getPropertyValue('--radix-collapsible-content-height')).toBe('120px');
        expect(content.style.getPropertyValue('--radix-collapsible-content-width')).toBe('320px');
    });

    test('clears inline height after opening with transitionDuration 0', () => {
        HTMLElement.prototype.getBoundingClientRect = jest.fn(function(this: HTMLElement) {
            if (this.dataset.testid === 'content') {
                return {
                    width: 200,
                    height: 80,
                    top: 0,
                    left: 0,
                    right: 200,
                    bottom: 80,
                    x: 0,
                    y: 0,
                    toJSON: () => ({})
                } as DOMRect;
            }

            return {
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                x: 0,
                y: 0,
                toJSON: () => ({})
            } as DOMRect;
        });

        render(
            <CollapsiblePrimitive.Root transitionDuration={0}>
                <CollapsiblePrimitive.Trigger data-testid="trigger">Toggle</CollapsiblePrimitive.Trigger>
                <CollapsiblePrimitive.Content data-testid="content">
                    <div>Measured Content</div>
                </CollapsiblePrimitive.Content>
            </CollapsiblePrimitive.Root>
        );

        fireEvent.click(screen.getByTestId('trigger'));

        const content = screen.getByTestId('content');

        expect(content).toHaveAttribute('data-state', 'open');
        expect(content.style.height).toBe('');
        expect(content.style.getPropertyValue('--radix-collapsible-content-height')).toBe('80px');
    });
});
