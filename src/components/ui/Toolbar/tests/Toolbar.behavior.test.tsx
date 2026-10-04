import React from 'react';
import fs from 'node:fs';
import path from 'node:path';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Toolbar from '../Toolbar';
import { axe, keyboard } from 'test-utils';

describe('Toolbar keyboard navigation and a11y', () => {
    test('arrow keys move focus between items', async() => {
        render(
            <Toolbar.Root aria-label="Editor toolbar">
                <Toolbar.Button>Bold</Toolbar.Button>
                <Toolbar.Button>Italic</Toolbar.Button>
                <Toolbar.Link href="#">Link</Toolbar.Link>
            </Toolbar.Root>
        );

        const user = keyboard();
        await user.tab();
        const buttons = screen.getAllByRole('button');
        const link = screen.getByRole('link');
        expect(buttons[0]).toHaveFocus();
        await user.keyboard('{ArrowRight}');
        expect(buttons[1]).toHaveFocus();
        await user.keyboard('{ArrowRight}');
        expect(link).toHaveFocus();
        await user.keyboard('{ArrowLeft}');
        expect(buttons[1]).toHaveFocus();
    });

    test('home and end keys move to first and last toolbar item', async() => {
        render(
            <Toolbar.Root aria-label="Editor toolbar">
                <Toolbar.Button>Bold</Toolbar.Button>
                <Toolbar.Button>Italic</Toolbar.Button>
                <Toolbar.Link href="#">Link</Toolbar.Link>
            </Toolbar.Root>
        );

        const user = keyboard();
        await user.tab();
        const buttons = screen.getAllByRole('button');
        const link = screen.getByRole('link');

        await user.keyboard('{End}');
        expect(link).toHaveFocus();
        await user.keyboard('{Home}');
        expect(buttons[0]).toHaveFocus();
    });

    test('vertical orientation uses arrow up/down', async() => {
        render(
            <Toolbar.Root aria-label="Editor toolbar" orientation="vertical">
                <Toolbar.Button>Bold</Toolbar.Button>
                <Toolbar.Button>Italic</Toolbar.Button>
                <Toolbar.Link href="#">Link</Toolbar.Link>
            </Toolbar.Root>
        );

        const user = keyboard();
        await user.tab();
        const buttons = screen.getAllByRole('button');
        const link = screen.getByRole('link');

        await user.keyboard('{ArrowDown}');
        expect(buttons[1]).toHaveFocus();
        await user.keyboard('{ArrowDown}');
        expect(link).toHaveFocus();
        await user.keyboard('{ArrowUp}');
        expect(buttons[1]).toHaveFocus();
    });

    test('loop mode wraps focus at edges', async() => {
        render(
            <Toolbar.Root aria-label="Editor toolbar" loop>
                <Toolbar.Button>Bold</Toolbar.Button>
                <Toolbar.Button>Italic</Toolbar.Button>
                <Toolbar.Link href="#">Link</Toolbar.Link>
            </Toolbar.Root>
        );

        const user = keyboard();
        await user.tab();
        const buttons = screen.getAllByRole('button');
        const link = screen.getByRole('link');

        await user.keyboard('{ArrowLeft}');
        expect(link).toHaveFocus();
        await user.keyboard('{ArrowRight}');
        expect(buttons[0]).toHaveFocus();
    });

    test('toggle group item receives roving focus and updates pressed state', async() => {
        render(
            <Toolbar.Root aria-label="Editor toolbar">
                <Toolbar.Button>Bold</Toolbar.Button>
                <Toolbar.ToggleGroup type="single" defaultValue={['italic']}>
                    <Toolbar.ToggleItem value="italic">Italic</Toolbar.ToggleItem>
                    <Toolbar.ToggleItem value="underline">Underline</Toolbar.ToggleItem>
                </Toolbar.ToggleGroup>
                <Toolbar.Link href="#">Link</Toolbar.Link>
            </Toolbar.Root>
        );

        const user = keyboard();
        await user.tab();

        const bold = screen.getByRole('button', { name: 'Bold' });
        const italic = screen.getByRole('radio', { name: 'Italic' });
        const underline = screen.getByRole('radio', { name: 'Underline' });
        expect(bold).toHaveFocus();

        await user.keyboard('{ArrowRight}');
        expect(italic).toHaveFocus();
        expect(italic).toHaveAttribute('aria-checked', 'true');

        await user.keyboard('{ArrowRight}');
        expect(underline).toHaveFocus();
        await user.keyboard('{Enter}');
        expect(underline).toHaveAttribute('aria-checked', 'true');
        expect(italic).toHaveAttribute('aria-checked', 'false');
        // Single-select toggles are radios, so they must not also expose aria-pressed.
        expect(italic).not.toHaveAttribute('aria-pressed');
    });

    test('toggle group does not emit generated classes without a namespace', () => {
        render(
            <Toolbar.Root aria-label="Editor toolbar" data-testid="toolbar-root">
                <Toolbar.ToggleGroup data-testid="toggle-group" type="single">
                    <Toolbar.ToggleItem value="italic">Italic</Toolbar.ToggleItem>
                </Toolbar.ToggleGroup>
            </Toolbar.Root>
        );

        expect(screen.getByTestId('toolbar-root').className).toBe('');
        expect(screen.getByTestId('toggle-group').className).toBe('');
        expect(screen.getByRole('radio', { name: 'Italic' }).className).toBe('');
    });

    test('toggle group emits generated classes when customRootClass provides a namespace', () => {
        render(
            <Toolbar.Root aria-label="Editor toolbar" customRootClass="acme" data-testid="toolbar-root">
                <Toolbar.ToggleGroup data-testid="toggle-group" type="single">
                    <Toolbar.ToggleItem value="italic">Italic</Toolbar.ToggleItem>
                </Toolbar.ToggleGroup>
            </Toolbar.Root>
        );

        expect(screen.getByTestId('toolbar-root')).toHaveClass('acme-toolbar');
        expect(screen.getByTestId('toggle-group')).toHaveClass('acme-toolbar-toggle-group');
        expect(screen.getByRole('radio', { name: 'Italic' })).toHaveClass('acme-toolbar-toggle-item');
    });

    test('toggle group recipe does not clip focus rings at group edges', () => {
        const stylesheet = fs.readFileSync(path.resolve(__dirname, '../toolbar.clarity.scss'), 'utf8');
        const groupStart = stylesheet.indexOf('.rad-ui-toolbar-toggle-group {');
        const groupBlock = stylesheet.slice(groupStart, stylesheet.indexOf('}', groupStart));

        expect(groupStart).toBeGreaterThan(-1);
        expect(groupBlock).not.toContain('overflow: hidden');
        expect(stylesheet).toContain('&:focus-visible');
    });

    test('toolbar children share one control recipe with a distinct pressed state', () => {
        const stylesheet = fs.readFileSync(path.resolve(__dirname, '../toolbar.clarity.scss'), 'utf8');

        // Buttons, links and toggle items are styled by the same rule so their
        // height, radius, hover and focus treatment cannot drift apart.
        expect(stylesheet).toMatch(/\.rad-ui-toolbar-button,\s*\.rad-ui-toolbar-link,\s*\.rad-ui-toolbar-toggle-item \{/);
        expect(stylesheet).toContain('min-height: var(--rad-ui-toolbar-control-height)');
        expect(stylesheet).toContain('border-radius: var(--rad-ui-toolbar-control-radius)');
        // Pressed toggle items are not communicated by color alone.
        expect(stylesheet).toMatch(/&\[data-state='on'\] \{[^}]*box-shadow: var\(--rad-ui-selected-control-shadow\)/);
        // The root hugs its controls instead of stretching to its flex line.
        expect(stylesheet).toContain('height: fit-content');
    });

    test('asChild preserves custom element semantics', async() => {
        render(
            <Toolbar.Root aria-label="Editor toolbar">
                <Toolbar.Button asChild>
                    <button type="button">Custom Button</button>
                </Toolbar.Button>
                <Toolbar.Link asChild>
                    <a href="/docs">Docs</a>
                </Toolbar.Link>
            </Toolbar.Root>
        );

        expect(screen.getByRole('button', { name: 'Custom Button' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
    });

    test('axe: no accessibility violations', async() => {
        const { container } = render(
            <Toolbar.Root aria-label="Editor toolbar">
                <Toolbar.Button>Bold</Toolbar.Button>
                <Toolbar.Button>Italic</Toolbar.Button>
                <Toolbar.ToggleGroup type="multiple" defaultValue={['underline']}>
                    <Toolbar.ToggleItem value="underline">Underline</Toolbar.ToggleItem>
                </Toolbar.ToggleGroup>
                <Toolbar.Link href="#">Link</Toolbar.Link>
            </Toolbar.Root>
        );
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });
});
