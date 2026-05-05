import React, { createRef } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HoverCard from '../HoverCard';
import Theme from '~/components/ui/Theme/Theme';

const mockMatchMedia = () => {
    if ('matchMedia' in window && typeof window.matchMedia === 'function') {
        return;
    }

    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn()
        }))
    });
};

describe('HoverCard', () => {
    test('forwards refs', () => {
        const rootRef = createRef<HTMLDivElement>();
        const triggerRef = createRef<HTMLSpanElement>();
        const contentRef = createRef<HTMLDivElement>();
        const arrowRef = createRef<SVGSVGElement>();

        render(
            <HoverCard.Root open onOpenChange={() => {}} ref={rootRef}>
                <HoverCard.Trigger ref={triggerRef}>Trigger</HoverCard.Trigger>
                <HoverCard.Content ref={contentRef}>
                    Content
                    <HoverCard.Arrow ref={arrowRef} />
                </HoverCard.Content>
            </HoverCard.Root>
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(triggerRef.current).toBeInstanceOf(HTMLSpanElement);
        expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
        expect(arrowRef.current).toBeInstanceOf(SVGSVGElement);
    });

    test('does not hijack child refs', () => {
        const triggerRef = createRef<HTMLSpanElement>();
        const buttonRef = createRef<HTMLButtonElement>();

        render(
            <HoverCard.Root open onOpenChange={() => {}}>
                <HoverCard.Trigger ref={triggerRef}>
                    <button ref={buttonRef}>Trigger</button>
                </HoverCard.Trigger>
            </HoverCard.Root>
        );

        expect(triggerRef.current).toBeInstanceOf(HTMLSpanElement);
        expect(buttonRef.current).toBeInstanceOf(HTMLButtonElement);
        expect(buttonRef.current).not.toBe(triggerRef.current);
    });

    test('keeps root and content classes separate', () => {
        render(
            <HoverCard.Root open customRootClass="rad-ui" className="custom-root">
                <HoverCard.Trigger>Trigger</HoverCard.Trigger>
                <HoverCard.Content>Content</HoverCard.Content>
            </HoverCard.Root>
        );

        const trigger = screen.getByText('Trigger');
        const root = trigger.parentElement;
        const content = screen.getByRole('dialog');

        expect(root).toHaveClass('rad-ui-hover-card-root');
        expect(root).toHaveClass('custom-root');
        expect(root).not.toHaveClass('rad-ui-hover-card');
        expect(trigger).toHaveClass('rad-ui-hover-card-trigger');
        expect(content).toHaveClass('rad-ui-hover-card');
    });

    test('portals content inside the active theme scope', async() => {
        mockMatchMedia();

        render(
            <Theme appearance="dark" classNamespace="rad-ui">
                <HoverCard.Root open customRootClass="rad-ui">
                    <HoverCard.Trigger>Trigger</HoverCard.Trigger>
                    <HoverCard.Portal>
                        <HoverCard.Content>Content</HoverCard.Content>
                    </HoverCard.Portal>
                </HoverCard.Root>
            </Theme>
        );

        const content = await screen.findByRole('dialog');

        expect(content.closest('[data-rad-ui-theme="dark"]')).toBeInTheDocument();
        expect(content.closest('[data-rad-ui-portal-root]')).toBeInTheDocument();
    });

    test('supports a custom portal container and portal forceMount', async() => {
        mockMatchMedia();
        const container = document.createElement('div');
        document.body.appendChild(container);

        render(
            <HoverCard.Root open={false} onOpenChange={() => {}} customRootClass="rad-ui">
                <HoverCard.Trigger>Trigger</HoverCard.Trigger>
                <HoverCard.Portal container={container} forceMount>
                    <HoverCard.Content>Content</HoverCard.Content>
                </HoverCard.Portal>
            </HoverCard.Root>
        );

        const content = await screen.findByRole('dialog', { hidden: true });
        expect(container).toContainElement(content);
        expect(content).toHaveAttribute('data-state', 'closed');
    });

    test('renders without warnings and toggles on hover', async() => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const unexpectedErrors: unknown[][] = [];
        const error = jest.spyOn(console, 'error').mockImplementation((...args) => {
            const [message] = args;

            if (typeof message === 'string' && message.includes('not wrapped in act')) {
                return;
            }

            unexpectedErrors.push(args);
        });
        const user = userEvent.setup();

        render(
            <HoverCard.Root openDelay={0} closeDelay={0} onOpenChange={() => {}}>
                <HoverCard.Trigger>Hover me</HoverCard.Trigger>
                <HoverCard.Content>Card content</HoverCard.Content>
            </HoverCard.Root>
        );

        expect(screen.queryByText('Card content')).not.toBeInTheDocument();
        const trigger = screen.getByText('Hover me');
        await user.hover(trigger);
        expect(await screen.findByRole('dialog')).toHaveTextContent('Card content');
        await user.unhover(trigger);
        await waitFor(() => {
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        expect(warn).not.toHaveBeenCalled();
        expect(unexpectedErrors).toHaveLength(0);
        warn.mockRestore();
        error.mockRestore();
    });
});
