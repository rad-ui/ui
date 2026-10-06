import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Tabs from '../Tabs';

const renderTabs = (rootProps: React.ComponentProps<typeof Tabs.Root> = {}) => render(
    <>
        <button>before</button>
        <Tabs.Root {...rootProps}>
            <Tabs.List aria-label="Sections">
                <Tabs.Trigger value="one">One</Tabs.Trigger>
                <Tabs.Trigger value="two">Two</Tabs.Trigger>
                <Tabs.Trigger value="three">Three</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="one">Panel one</Tabs.Content>
            <Tabs.Content value="two">Panel two</Tabs.Content>
            <Tabs.Content value="three">Panel three</Tabs.Content>
        </Tabs.Root>
        <button>after</button>
    </>
);

describe('Tabs regressions', () => {
    test('tabbing back into the tablist focuses the selected tab and keeps the selection', async() => {
        const user = userEvent.setup();
        renderTabs({ defaultValue: 'one' });

        await user.click(screen.getByRole('tab', { name: 'Three' }));
        expect(screen.getByRole('tab', { name: 'Three' })).toHaveAttribute('tabindex', '0');
        expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('tabindex', '-1');

        await user.click(screen.getByText('before'));
        await user.tab();
        expect(screen.getByRole('tab', { name: 'Three' })).toHaveFocus();
        expect(screen.getByText('Panel three')).toBeInTheDocument();
    });

    test('initial tab stop is the selected tab, not the first tab', async() => {
        const user = userEvent.setup();
        renderTabs({ defaultValue: 'two' });
        await user.click(screen.getByText('before'));
        await user.tab();
        expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
        expect(screen.getByText('Panel two')).toBeInTheDocument();
    });

    test('controlled value changes move the tab stop', () => {
        const { rerender } = render(
            <Tabs.Root value="one" onValueChange={() => {}}>
                <Tabs.List>
                    <Tabs.Trigger value="one">One</Tabs.Trigger>
                    <Tabs.Trigger value="two">Two</Tabs.Trigger>
                </Tabs.List>
            </Tabs.Root>
        );
        expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('tabindex', '0');
        rerender(
            <Tabs.Root value="two" onValueChange={() => {}}>
                <Tabs.List>
                    <Tabs.Trigger value="one">One</Tabs.Trigger>
                    <Tabs.Trigger value="two">Two</Tabs.Trigger>
                </Tabs.List>
            </Tabs.Root>
        );
        expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('tabindex', '0');
        expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('tabindex', '-1');
    });

    test('links tabs and panels, and the panel is reachable with Tab', async() => {
        const user = userEvent.setup();
        renderTabs({ defaultValue: 'one' });
        const tab = screen.getByRole('tab', { name: 'One' });
        const panel = screen.getByRole('tabpanel');

        expect(tab).toHaveAttribute('aria-controls', panel.id);
        expect(panel).toHaveAttribute('aria-labelledby', tab.id);
        expect(panel).toHaveAccessibleName('One');

        tab.focus();
        await user.tab();
        expect(panel).toHaveFocus();
    });

    test('does not ship a placeholder aria-label on the tablist', () => {
        render(
            <Tabs.Root defaultValue="one">
                <Tabs.List>
                    <Tabs.Trigger value="one">One</Tabs.Trigger>
                </Tabs.List>
            </Tabs.Root>
        );
        expect(screen.getByRole('tablist')).not.toHaveAttribute('aria-label');
    });

    test('onValueChange is not called on mount or when re-selecting the active tab', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        renderTabs({ defaultValue: 'one', onValueChange });
        expect(onValueChange).not.toHaveBeenCalled();

        await user.click(screen.getByRole('tab', { name: 'One' }));
        expect(onValueChange).not.toHaveBeenCalled();

        await user.click(screen.getByRole('tab', { name: 'Two' }));
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith('two');
    });

    test('user onClick/onFocus handlers run and can prevent activation', async() => {
        const user = userEvent.setup();
        const onClick = jest.fn((event: React.MouseEvent) => event.preventDefault());
        render(
            <Tabs.Root defaultValue="one" activationMode="manual">
                <Tabs.List>
                    <Tabs.Trigger value="one">One</Tabs.Trigger>
                    <Tabs.Trigger value="two" onClick={onClick}>Two</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="one">Panel one</Tabs.Content>
                <Tabs.Content value="two">Panel two</Tabs.Content>
            </Tabs.Root>
        );
        await user.click(screen.getByRole('tab', { name: 'Two' }));
        expect(onClick).toHaveBeenCalled();
        expect(screen.getByText('Panel one')).toBeInTheDocument();
    });

    test('inactive force-mounted panels are hidden', () => {
        render(
            <Tabs.Root defaultValue="one">
                <Tabs.List>
                    <Tabs.Trigger value="one">One</Tabs.Trigger>
                    <Tabs.Trigger value="two">Two</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="one">Panel one</Tabs.Content>
                <Tabs.Content value="two" forceMount>Panel two</Tabs.Content>
            </Tabs.Root>
        );
        expect(screen.getByText('Panel two')).not.toBeVisible();
    });

    test('vertical orientation navigates with up/down arrows', async() => {
        const user = userEvent.setup();
        renderTabs({ defaultValue: 'one', orientation: 'vertical' });
        screen.getByRole('tab', { name: 'One' }).focus();
        await user.keyboard('{ArrowDown}');
        expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
        expect(screen.getByText('Panel two')).toBeInTheDocument();
        await user.keyboard('{ArrowRight}');
        expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
        expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
    });

    test('axe: no violations including the roving wrapper', async() => {
        const { container } = renderTabs({ defaultValue: 'one' });
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toEqual([]);
        expect(container.querySelector('[data-slot="tabs-root"]')).not.toHaveAttribute('aria-orientation');
    });
});

describe('Tabs consumer trigger ids', () => {
    test('a consumer id on Tabs.Trigger keeps the panel labelled by that tab', () => {
        render(
            <Tabs.Root defaultValue="one">
                <Tabs.List aria-label="Sections">
                    <Tabs.Trigger value="one" id="custom-one">One</Tabs.Trigger>
                    <Tabs.Trigger value="two">Two</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="one">Panel one</Tabs.Content>
                <Tabs.Content value="two" forceMount>Panel two</Tabs.Content>
            </Tabs.Root>
        );
        const tab = screen.getByRole('tab', { name: 'One' });
        expect(tab).toHaveAttribute('id', 'custom-one');
        expect(screen.getByRole('tabpanel', { name: 'One' })).toHaveAttribute('aria-labelledby', 'custom-one');
        expect(document.getElementById(tab.getAttribute('aria-controls')!)).toHaveTextContent('Panel one');
        // The generated id still applies to tabs without a consumer id.
        const twoPanel = screen.getByText('Panel two');
        expect(document.getElementById(twoPanel.getAttribute('aria-labelledby')!)).toHaveTextContent('Two');
    });
});
