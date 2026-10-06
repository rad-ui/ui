import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from '../Accordion';

describe('Accordion open items are stable across re-renders', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('opening another item (multiple) does not collapse already-open content', async() => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        render(
            <Accordion.Root type="multiple" defaultValue={['a']}>
                <Accordion.Item value="a">
                    <Accordion.Header><Accordion.Trigger>A</Accordion.Trigger></Accordion.Header>
                    <Accordion.Content>Content A</Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="b">
                    <Accordion.Header><Accordion.Trigger>B</Accordion.Trigger></Accordion.Header>
                    <Accordion.Content>Content B</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        );
        const contentA = screen.getByText('Content A').closest('[data-slot="accordion-content"]') as HTMLElement;
        act(() => { jest.advanceTimersByTime(500); });
        expect(contentA.style.height).toBe('');

        await user.click(screen.getByText('B'));
        expect(contentA.style.height).toBe('');
        act(() => { jest.advanceTimersByTime(50); });
        expect(contentA.style.height).toBe('');
    });
});

describe('Accordion ARIA and motion regressions', () => {
    const renderAccordion = (triggerProps: Record<string, unknown> = {}) => render(
        <Accordion.Root type="single" collapsible defaultValue="a">
            <Accordion.Item value="a">
                <Accordion.Header><Accordion.Trigger {...triggerProps}>A</Accordion.Trigger></Accordion.Header>
                <Accordion.Content>Content A</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="b" disabled>
                <Accordion.Header><Accordion.Trigger>B</Accordion.Trigger></Accordion.Header>
                <Accordion.Content>Content B</Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    );

    test('triggers do not carry aria-selected and the wrapper has no aria-orientation', async() => {
        const { container } = renderAccordion();
        screen.getAllByRole('button').forEach((button) => expect(button).not.toHaveAttribute('aria-selected'));
        expect(container.querySelector('[aria-orientation]')).toBeNull();
        const axe = await import('axe-core');
        const { ACCESSIBILITY_TEST_TAGS } = await import('~/setupTests');
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toEqual([]);
    });

    test('a consumer id on the trigger keeps the region labelled by the trigger', () => {
        renderAccordion({ id: 'custom-trigger' });
        const trigger = screen.getByRole('button', { name: 'A' });
        expect(trigger).toHaveAttribute('id', 'custom-trigger');
        expect(screen.getByRole('region')).toHaveAttribute('aria-labelledby', 'custom-trigger');
        expect(screen.getByRole('region')).toHaveAccessibleName('A');
    });

    test('header exposes data-state and data-disabled', () => {
        renderAccordion();
        const headers = document.querySelectorAll('[data-slot="accordion-header"]');
        expect(headers[0]).toHaveAttribute('data-state', 'open');
        expect(headers[1]).toHaveAttribute('data-state', 'closed');
        expect(headers[1]).toHaveAttribute('data-disabled');
    });

    test('respects prefers-reduced-motion by closing without a height tween', async() => {
        const original = window.matchMedia;
        window.matchMedia = ((query: string) => ({
            matches: query.includes('reduce'),
            media: query,
            onchange: null,
            addEventListener: () => {},
            removeEventListener: () => {},
            addListener: () => {},
            removeListener: () => {},
            dispatchEvent: () => false
        })) as unknown as typeof window.matchMedia;
        try {
            const user = userEvent.setup();
            renderAccordion();
            await user.click(screen.getByRole('button', { name: 'A' }));
            // Unmounted synchronously instead of after the 200ms tween.
            expect(screen.queryByText('Content A')).not.toBeInTheDocument();
        } finally {
            window.matchMedia = original;
        }
    });
});

describe('Accordion non-collapsible single mode', () => {
    const renderSingle = (props: Record<string, unknown> = {}) => render(
        <Accordion.Root defaultValue="a" {...props}>
            <Accordion.Item value="a">
                <Accordion.Header><Accordion.Trigger>A</Accordion.Trigger></Accordion.Header>
                <Accordion.Content>Content A</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="b">
                <Accordion.Header><Accordion.Trigger>B</Accordion.Trigger></Accordion.Header>
                <Accordion.Content>Content B</Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    );

    test('the open trigger is aria-disabled but stays focusable; the flag follows the open item', async() => {
        const user = userEvent.setup();
        renderSingle();
        const a = screen.getByRole('button', { name: 'A' });
        const b = screen.getByRole('button', { name: 'B' });
        expect(a).toHaveAttribute('aria-disabled', 'true');
        expect(a).not.toBeDisabled();
        expect(b).toHaveAttribute('aria-disabled', 'false');

        await user.click(b);
        expect(b).toHaveAttribute('aria-disabled', 'true');
        expect(a).toHaveAttribute('aria-disabled', 'false');
        b.focus();
        expect(b).toHaveFocus();
    });

    test('collapsible and multiple accordions never mark the open trigger aria-disabled', () => {
        const { unmount } = renderSingle({ collapsible: true });
        expect(screen.getByRole('button', { name: 'A' })).toHaveAttribute('aria-disabled', 'false');
        unmount();
        render(
            <Accordion.Root type="multiple" defaultValue={['a']}>
                <Accordion.Item value="a">
                    <Accordion.Header><Accordion.Trigger>A</Accordion.Trigger></Accordion.Header>
                    <Accordion.Content>Content A</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        );
        expect(screen.getByRole('button', { name: 'A' })).toHaveAttribute('aria-disabled', 'false');
    });
});
