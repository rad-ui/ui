import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Menubar from '../Menubar';

describe('Menubar accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(
            <Menubar.Root>
                <Menubar.Menu>
                    <Menubar.Trigger>File</Menubar.Trigger>
                    <Menubar.Content>
                        <Menubar.Item>New</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Menu>
            </Menubar.Root>
        );
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('exposes menubar semantics on root, triggers and content', () => {
        const { container, getByText } = render(
            <Menubar.Root aria-label="Application">
                <Menubar.Menu>
                    <Menubar.Trigger>File</Menubar.Trigger>
                    <Menubar.Content>
                        <Menubar.Item>New</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Menu>
                <Menubar.Menu>
                    <Menubar.Trigger>Edit</Menubar.Trigger>
                    <Menubar.Content>
                        <Menubar.Item>Cut</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Menu>
            </Menubar.Root>
        );

        const root = container.querySelector('[role="menubar"]');
        expect(root).not.toBeNull();
        expect(root).toHaveAttribute('aria-orientation', 'horizontal');
        expect(root?.querySelectorAll('[data-tree="true"][role="none"]')).toHaveLength(2);

        const file = getByText('File');
        expect(file).toHaveAttribute('role', 'menuitem');
        expect(file).toHaveAttribute('aria-haspopup', 'menu');
        expect(file).toHaveAttribute('aria-expanded', 'false');

        fireEvent.click(file);
        expect(file).toHaveAttribute('aria-expanded', 'true');
        expect(getByText('New').closest('[role="menu"]')).not.toBeNull();
        expect(getByText('New')).toHaveAttribute('role', 'menuitem');
    });

    test('axe: no violations with a menu open', async() => {
        const { container, getByText } = render(
            <Menubar.Root aria-label="Application">
                <Menubar.Menu>
                    <Menubar.Trigger>File</Menubar.Trigger>
                    <Menubar.Content>
                        <Menubar.Item>New</Menubar.Item>
                        <Menubar.Sub>
                            <Menubar.SubTrigger>More</Menubar.SubTrigger>
                            <Menubar.Content>
                                <Menubar.Item>Export</Menubar.Item>
                            </Menubar.Content>
                        </Menubar.Sub>
                    </Menubar.Content>
                </Menubar.Menu>
            </Menubar.Root>
        );
        fireEvent.click(getByText('File'));
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
