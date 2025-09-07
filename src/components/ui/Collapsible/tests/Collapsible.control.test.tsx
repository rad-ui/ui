import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import Collapsible from '../Collapsible';

axe.configure({
    rules: [{ id: 'color-contrast', enabled: false }]
});

describe('Collapsible controlled behaviour', () => {
    test('open prop syncs with onOpenChange and data-state', async () => {
        const user = userEvent.setup();
        function Controlled() {
            const [open, setOpen] = React.useState(false);
            return (
                <Collapsible.Root
                    open={open}
                    onOpenChange={setOpen}
                    transitionDuration={0}
                >
                    <Collapsible.Trigger>Trigger</Collapsible.Trigger>
                    <Collapsible.Content>Content</Collapsible.Content>
                </Collapsible.Root>
            );
        }
        render(<Controlled />);
        const trigger = screen.getByText('Trigger');
        expect(trigger).toHaveAttribute('data-state', 'closed');
        expect(screen.queryByText('Content')).not.toBeInTheDocument();

        await user.click(trigger);
        expect(trigger).toHaveAttribute('data-state', 'open');
        expect(screen.getByText('Content')).toBeInTheDocument();

        await user.click(trigger);
        expect(trigger).toHaveAttribute('data-state', 'closed');
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    test('exposes data-state and data-disabled attributes', async () => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();
        render(
            <Collapsible.Root defaultOpen disabled onOpenChange={onOpenChange} transitionDuration={0}>
                <Collapsible.Trigger>Toggle</Collapsible.Trigger>
                <Collapsible.Content>Disabled Content</Collapsible.Content>
            </Collapsible.Root>
        );
        const trigger = screen.getByText('Toggle');
        const root = trigger.parentElement as HTMLElement;

        expect(root).toHaveAttribute('data-state', 'open');
        expect(root).toHaveAttribute('data-disabled');
        expect(trigger).toHaveAttribute('data-disabled', 'true');

        await user.click(trigger);
        expect(onOpenChange).not.toHaveBeenCalled();
        expect(screen.getByText('Disabled Content')).toBeInTheDocument();
    });

    test('asChild trigger and content preserve semantics and refs', () => {
        const triggerRef = React.createRef<HTMLAnchorElement>();
        const contentRef = React.createRef<HTMLElement>();
        render(
            <Collapsible.Root defaultOpen transitionDuration={0}>
                <Collapsible.Trigger asChild ref={triggerRef as unknown as React.Ref<HTMLButtonElement>}>
                    <a href="#content">Link Trigger</a>
                </Collapsible.Trigger>
                <Collapsible.Content asChild ref={contentRef}>
                    <section id="content">Section Content</section>
                </Collapsible.Content>
            </Collapsible.Root>
        );
        expect(triggerRef.current?.tagName).toBe('A');
        expect(contentRef.current?.tagName).toBe('SECTION');
        expect(screen.getByText('Section Content')).toBeInTheDocument();
    });

    test('has no axe violations when closed or open', async () => {
        const user = userEvent.setup();
        const { container } = render(
            <Collapsible.Root transitionDuration={0}>
                <Collapsible.Trigger>Trigger</Collapsible.Trigger>
                <Collapsible.Content>Content</Collapsible.Content>
            </Collapsible.Root>
        );
        expect((await axe.run(container)).violations).toHaveLength(0);
        await user.click(screen.getByText('Trigger'));
        expect((await axe.run(container)).violations).toHaveLength(0);
    });

    test('supports keyboard interactions', async () => {
        const user = userEvent.setup();
        render(
            <Collapsible.Root transitionDuration={0}>
                <Collapsible.Trigger>Trigger</Collapsible.Trigger>
                <Collapsible.Content>Content</Collapsible.Content>
            </Collapsible.Root>
        );
        const trigger = screen.getByText('Trigger');
        trigger.focus();
        await user.keyboard('{Enter}');
        expect(screen.getByText('Content')).toBeInTheDocument();
        await user.keyboard('{Escape}');
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
        trigger.focus();
        await user.keyboard(' ');
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    test('renders and hydrates without warnings', () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const error = jest.spyOn(console, 'error').mockImplementation(() => {});
        const { TextEncoder, TextDecoder } = require('util');
        // @ts-ignore
        global.TextEncoder = TextEncoder;
        // @ts-ignore
        global.TextDecoder = TextDecoder;
        const { renderToString } = require('react-dom/server');
        const { hydrateRoot } = require('react-dom/client');
        const html = renderToString(
            <Collapsible.Root open transitionDuration={0}>
                <Collapsible.Trigger>Trigger</Collapsible.Trigger>
                <Collapsible.Content>Content</Collapsible.Content>
            </Collapsible.Root>
        );
        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container);
        let root: any;
        act(() => {
            root = hydrateRoot(
                container,
                <Collapsible.Root open transitionDuration={0}>
                    <Collapsible.Trigger>Trigger</Collapsible.Trigger>
                    <Collapsible.Content>Content</Collapsible.Content>
                </Collapsible.Root>
            );
        });
        expect(error).not.toHaveBeenCalled();
        expect(warn).not.toHaveBeenCalled();
        root.unmount();
        document.body.removeChild(container);
        warn.mockRestore();
        error.mockRestore();
    });

    test('handles nested collapsibles', async () => {
        const user = userEvent.setup();
        render(
            <Collapsible.Root transitionDuration={0}>
                <Collapsible.Trigger>Outer</Collapsible.Trigger>
                <Collapsible.Content>
                    <Collapsible.Root transitionDuration={0}>
                        <Collapsible.Trigger>Inner</Collapsible.Trigger>
                        <Collapsible.Content>Inner Content</Collapsible.Content>
                    </Collapsible.Root>
                </Collapsible.Content>
            </Collapsible.Root>
        );
        const outerTrigger = screen.getByText('Outer');
        await user.click(outerTrigger);
        const innerTrigger = await screen.findByText('Inner');
        await user.click(innerTrigger);
        expect(screen.getByText('Inner Content')).toBeInTheDocument();
        await user.click(innerTrigger);
        expect(screen.queryByText('Inner Content')).not.toBeInTheDocument();
    });

    test('supports RTL direction', async () => {
        const user = userEvent.setup();
        render(
            <Collapsible.Root dir="rtl" transitionDuration={0}>
                <Collapsible.Trigger>Trigger</Collapsible.Trigger>
                <Collapsible.Content>Content</Collapsible.Content>
            </Collapsible.Root>
        );
        const trigger = screen.getByText('Trigger');
        const root = trigger.parentElement as HTMLElement;
        expect(root).toHaveAttribute('dir', 'rtl');
        await user.click(trigger);
        expect(screen.getByText('Content')).toBeInTheDocument();
    });
});

