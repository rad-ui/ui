import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HoverCard from '../HoverCard';

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

    test('renders without warnings and toggles on hover', async() => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const error = jest.spyOn(console, 'error').mockImplementation(() => {});

        render(
            <HoverCard.Root openDelay={0} closeDelay={0} onOpenChange={() => {}}>
                <HoverCard.Trigger>Hover me</HoverCard.Trigger>
                <HoverCard.Content>Card content</HoverCard.Content>
            </HoverCard.Root>
        );

        expect(screen.queryByText('Card content')).not.toBeInTheDocument();
        const trigger = screen.getByText('Hover me');
        await userEvent.hover(trigger);
        expect(screen.getByRole('dialog')).toHaveTextContent('Card content');
        await userEvent.unhover(trigger);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

        expect(warn).not.toHaveBeenCalled();
        expect(error).not.toHaveBeenCalled();
        warn.mockRestore();
        error.mockRestore();
    });
});
