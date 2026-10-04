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

    test('items carry no aria-selected and aria-orientation only appears on the toolbar', () => {
        const { container } = render(
            <Toolbar.Root aria-label="Formatting" orientation="vertical">
                <Toolbar.Button>Cut</Toolbar.Button>
                <Toolbar.ToggleGroup type="single">
                    <Toolbar.ToggleItem value="left">Left</Toolbar.ToggleItem>
                </Toolbar.ToggleGroup>
                <Toolbar.Link href="#help">Help</Toolbar.Link>
            </Toolbar.Root>
        );
        expect(container.querySelectorAll('[aria-selected]')).toHaveLength(0);
        const oriented = container.querySelectorAll('[aria-orientation]');
        expect(oriented).toHaveLength(1);
        expect(oriented[0]).toHaveAttribute('role', 'toolbar');
        expect(oriented[0]).toHaveAttribute('aria-orientation', 'vertical');
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

    test('single-select toggle group uses radio semantics and passes axe', async() => {
        const { container } = render(
            <Toolbar.Root aria-label="Text alignment">
                <Toolbar.ToggleGroup type="single" defaultValue={['left']} aria-label="Alignment">
                    <Toolbar.ToggleItem value="left">Left</Toolbar.ToggleItem>
                    <Toolbar.ToggleItem value="center">Center</Toolbar.ToggleItem>
                </Toolbar.ToggleGroup>
            </Toolbar.Root>
        );
        expect(screen.getByRole('radiogroup', { name: 'Alignment' })).toBeInTheDocument();
        const left = screen.getByRole('radio', { name: 'Left' });
        const center = screen.getByRole('radio', { name: 'Center' });
        expect(left).toHaveAttribute('aria-checked', 'true');
        expect(center).toHaveAttribute('aria-checked', 'false');
        expect(left).not.toHaveAttribute('aria-pressed');

        const user = userEvent.setup();
        center.focus();
        await user.keyboard(' ');
        expect(center).toHaveAttribute('aria-checked', 'true');
        expect(left).toHaveAttribute('aria-checked', 'false');

        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toEqual([]);
    });

    test('multiple-select toggle group keeps group + aria-pressed semantics', () => {
        renderToolbar();
        expect(screen.getByRole('group')).toBeInTheDocument();
        expect(screen.queryByRole('radio')).toBeNull();
        expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-pressed', 'true');
    });
});
