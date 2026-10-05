import React from 'react';
import { render, screen } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Command from '../Command';

const renderCommand = () => render(
    <Command>
        <Command.Input placeholder="Type a command or search..." />
        <Command.List>
            <Command.Empty>No results found.</Command.Empty>
            <Command.Group heading="Navigation">
                <Command.Item value="home">
                    Home
                    <Command.Shortcut>⌘H</Command.Shortcut>
                </Command.Item>
                <Command.Item value="inbox">
                    Inbox
                    <Command.Shortcut>⌘I</Command.Shortcut>
                </Command.Item>
            </Command.Group>
        </Command.List>
    </Command>
);

describe('Command accessibility', () => {
    // role="separator" is not an allowed child of role="listbox"
    // (axe: aria-required-children), so separators are hidden from the a11y tree.
    test('axe: no violations with a separator between groups', async() => {
        const { container } = render(
            <Command>
                <Command.Input aria-label="Search commands" />
                <Command.List>
                    <Command.Group heading="Navigation">
                        <Command.Item value="home">Home</Command.Item>
                    </Command.Group>
                    <Command.Separator />
                    <Command.Group heading="Settings">
                        <Command.Item value="profile">Profile</Command.Item>
                    </Command.Group>
                </Command.List>
            </Command>
        );
        const separator = container.querySelector('[data-slot="command-separator"]');
        expect(separator).toHaveAttribute('aria-hidden', 'true');
        expect(separator).not.toHaveAttribute('role', 'separator');
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('axe: no violations', async() => {
        const { container } = renderCommand();
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('exposes the combobox role on the input', () => {
        renderCommand();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    // A placeholder is not an accessible name, so the input here has none.
    // Consumers must supply a label; assert the mechanism both ways so a
    // regression that drops aria-label support is caught.
    test('placeholder is present but is not treated as an accessible name', () => {
        renderCommand();
        const input = screen.getByRole('combobox');
        expect(input).toHaveAttribute('placeholder');
        expect(screen.queryByRole('combobox', { name: /type a command/i })).not.toBeInTheDocument();
    });

    test('combobox is nameable via aria-label', () => {
        render(
            <Command>
                <Command.Input aria-label="Search commands" placeholder="Type a command..." />
                <Command.List>
                    <Command.Empty>No results found.</Command.Empty>
                    <Command.Group heading="Navigation">
                        <Command.Item value="home">Home</Command.Item>
                    </Command.Group>
                </Command.List>
            </Command>
        );
        expect(screen.getByRole('combobox', { name: 'Search commands' })).toBeInTheDocument();
    });

    test('renders list items', () => {
        renderCommand();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Inbox')).toBeInTheDocument();
    });

    test('exposes the listbox role', () => {
        renderCommand();
        expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    test('renders the group heading', () => {
        renderCommand();
        expect(screen.getByText('Navigation')).toBeInTheDocument();
    });
});
