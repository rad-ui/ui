import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Toolbar from '../Toolbar';

const renderToolbar = () => render(
    <Toolbar.Root aria-label="Formatting options">
        <Toolbar.ToggleGroup type="multiple" defaultValue={['bold']}>
            <Toolbar.ToggleItem value="bold" aria-label="Bold">B</Toolbar.ToggleItem>
            <Toolbar.ToggleItem value="italic" aria-label="Italic">I</Toolbar.ToggleItem>
            <Toolbar.ToggleItem value="underline" aria-label="Underline">U</Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
        <Toolbar.Separator />
        <Toolbar.Link href="#" aria-label="Insert link">Link</Toolbar.Link>
    </Toolbar.Root>
);

describe('Toolbar accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = renderToolbar();
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('exposes the toolbar role', () => {
        renderToolbar();
        expect(screen.getByRole('toolbar')).toBeInTheDocument();
    });

    test('is reachable by its accessible name', () => {
        renderToolbar();
        expect(screen.getByRole('toolbar', { name: 'Formatting options' })).toBeInTheDocument();
    });
});

describe('Toolbar keyboard navigation', () => {
    test('arrow key moves focus between items', async() => {
        const user = userEvent.setup();
        renderToolbar();
        const bold = screen.getByRole('button', { name: 'Bold' });
        bold.focus();
        await user.keyboard('{ArrowRight}');
        expect(document.activeElement).not.toBe(bold);
    });

    test('toggle items respond to Enter', async() => {
        const user = userEvent.setup();
        renderToolbar();
        const italic = screen.getByRole('button', { name: 'Italic' });
        italic.focus();
        await user.keyboard('{Enter}');
        expect(italic).toHaveAttribute('data-state', 'on');
    });

    test('toggle items respond to Space', async() => {
        const user = userEvent.setup();
        renderToolbar();
        const underline = screen.getByRole('button', { name: 'Underline' });
        underline.focus();
        await user.keyboard(' ');
        expect(underline).toHaveAttribute('data-state', 'on');
    });
});