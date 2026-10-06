import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Disclosure from '../Disclosure';

const renderDisclosure = (rootProps: React.ComponentProps<typeof Disclosure.Root> = {}) => render(
    <Disclosure.Root {...rootProps}>
        <Disclosure.Item value="keyboard">
            <Disclosure.Trigger>Keyboard</Disclosure.Trigger>
            <Disclosure.Content>Keyboard content</Disclosure.Content>
        </Disclosure.Item>
        <Disclosure.Item value="styling">
            <Disclosure.Trigger>Styling</Disclosure.Trigger>
            <Disclosure.Content>Styling content</Disclosure.Content>
        </Disclosure.Item>
    </Disclosure.Root>
);

describe('Disclosure regressions', () => {
    test('trigger uses disclosure semantics (no aria-haspopup / aria-selected) and labels its region', async() => {
        const user = userEvent.setup();
        renderDisclosure();
        const trigger = screen.getByRole('button', { name: 'Keyboard' });
        expect(trigger).not.toHaveAttribute('aria-haspopup');
        expect(trigger).not.toHaveAttribute('aria-selected');
        expect(trigger).toHaveAttribute('aria-expanded', 'false');

        await user.click(trigger);
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        const region = screen.getByRole('region', { name: 'Keyboard' });
        expect(trigger).toHaveAttribute('aria-controls', region.id);
        expect(region).toHaveTextContent('Keyboard content');
    });

    test('items are not landmarks and an unlabelled root is not a landmark', () => {
        renderDisclosure();
        expect(screen.queryAllByRole('region')).toHaveLength(0);
        document.querySelectorAll('[data-slot="disclosure-item"]').forEach((item) => {
            expect(item).not.toHaveAttribute('role');
            expect(item).not.toHaveAttribute('aria-labelledby');
        });
    });

    test('a labelled root is a region landmark', () => {
        renderDisclosure({ 'aria-label': 'FAQ' });
        expect(screen.getByRole('region', { name: 'FAQ' })).toBeInTheDocument();
    });

    test('opening another item closes the previous one, with string values', async() => {
        const user = userEvent.setup();
        renderDisclosure();
        await user.click(screen.getByRole('button', { name: 'Keyboard' }));
        await user.click(screen.getByRole('button', { name: 'Styling' }));
        expect(screen.getByRole('button', { name: 'Keyboard' })).toHaveAttribute('aria-expanded', 'false');
        expect(screen.getByRole('button', { name: 'Styling' })).toHaveAttribute('aria-expanded', 'true');
        await waitFor(() => expect(screen.queryByText('Keyboard content')).not.toBeInTheDocument());
    });

    test('content reports closed state while it animates out', async() => {
        const user = userEvent.setup();
        renderDisclosure({ defaultOpen: 'keyboard' });
        const content = screen.getByText('Keyboard content');
        expect(content).toHaveAttribute('data-state', 'open');
        await user.click(screen.getByRole('button', { name: 'Keyboard' }));
        if (content.isConnected) {
            expect(content).toHaveAttribute('data-state', 'closed');
            expect(content).toHaveAttribute('aria-hidden', 'true');
        }
        await waitFor(() => expect(content).not.toBeInTheDocument());
    });

    test('consumer onClick can cancel the toggle', async() => {
        const user = userEvent.setup();
        render(
            <Disclosure.Root>
                <Disclosure.Item value={0}>
                    <Disclosure.Trigger onClick={(event) => event.preventDefault()}>Item</Disclosure.Trigger>
                    <Disclosure.Content>Content</Disclosure.Content>
                </Disclosure.Item>
            </Disclosure.Root>
        );
        await user.click(screen.getByRole('button', { name: 'Item' }));
        expect(screen.getByRole('button', { name: 'Item' })).toHaveAttribute('aria-expanded', 'false');
    });

    test('up/down arrows move between triggers', async() => {
        const user = userEvent.setup();
        renderDisclosure();
        screen.getByRole('button', { name: 'Keyboard' }).focus();
        await user.keyboard('{ArrowDown}');
        expect(screen.getByRole('button', { name: 'Styling' })).toHaveFocus();
        await user.keyboard('{ArrowUp}');
        expect(screen.getByRole('button', { name: 'Keyboard' })).toHaveFocus();
    });

    test('axe: no violations when open, without an aria-label', async() => {
        const { container } = renderDisclosure({ defaultOpen: 'keyboard' });
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toEqual([]);
        expect(container.querySelector('[aria-orientation]')).toBeNull();
    });
});

describe('Disclosure content styles', () => {
    test('the animated content element has no vertical padding (close animates to 0 without a snap)', () => {
        const sass = require('sass');
        const path = require('path');
        const css: string = sass.compile(path.resolve(__dirname, '../disclosure.clarity.scss')).css;
        const contentRule = css.match(/\.rad-ui-disclosure-content\s*\{([^}]*)\}/);
        expect(contentRule).not.toBeNull();
        const body = contentRule![1];
        const padding = body.match(/padding:\s*([^;]+);/);
        expect(padding).not.toBeNull();
        // Single value would be a vertical padding; two values must be "0 <inline>".
        expect(padding![1].trim().split(/\s+/)[0]).toBe('0');
        expect(padding![1].trim().split(/\s+/).length).toBe(2);
        expect(body).not.toMatch(/padding-(top|bottom|block)/);
        // The bottom spacing lives inside the clipped box instead.
        expect(css).toMatch(/\.rad-ui-disclosure-content::after\s*\{[^}]*height:/);
    });
});
