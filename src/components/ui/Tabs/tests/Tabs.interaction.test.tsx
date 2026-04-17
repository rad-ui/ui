import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tabs from '../Tabs';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import { TextEncoder, TextDecoder } from 'util';

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
// @ts-ignore - React 18/19 server rendering types may not be present
const { renderToString } = require('react-dom/server');
// @ts-ignore - hydrateRoot typings may be unavailable in this environment
const { hydrateRoot } = require('react-dom/client');

// Helper to wait for axe asynchronously
const runAxe = (container: HTMLElement) =>
    axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });

describe('Tabs interactions', () => {
    test('roving tabindex and keyboard activation', async() => {
        const user = userEvent.setup();
        render(
            <Tabs.Root defaultValue="t1" activationMode="manual">
                <Tabs.List>
                    <Tabs.Trigger value="t1">Tab 1</Tabs.Trigger>
                    <Tabs.Trigger value="t2" disabled>
                        Tab 2 disabled
                    </Tabs.Trigger>
                    <Tabs.Trigger value="t3">Tab 3</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="t1">Panel 1</Tabs.Content>
                <Tabs.Content value="t2">Panel 2</Tabs.Content>
                <Tabs.Content value="t3">Panel 3</Tabs.Content>
            </Tabs.Root>
        );

        const tab1 = screen.getByText('Tab 1');
        const tab2 = screen.getByText('Tab 2 disabled');
        const tab3 = screen.getByText('Tab 3');

        await user.tab();
        expect(tab1).toHaveFocus();
        expect(tab1).toHaveAttribute('tabindex', '0');
        expect(tab3).toHaveAttribute('tabindex', '-1');

        await user.keyboard('{ArrowRight}');
        // Should skip disabled tab2 and move to tab3
        expect(tab3).toHaveFocus();
        expect(tab3).toHaveAttribute('tabindex', '0');
        expect(tab1).toHaveAttribute('tabindex', '-1');
        // Still active tab1 since activationMode is manual
        expect(screen.getByText('Panel 1')).toBeInTheDocument();

        // Activate with Enter
        await user.keyboard('{Enter}');
        expect(screen.getByText('Panel 3')).toBeInTheDocument();
        expect(tab3).toHaveAttribute('data-state', 'active');
        expect(tab1).toHaveAttribute('data-state', 'inactive');
    });

    test('data-state attributes sync between trigger and content', async() => {
        const user = userEvent.setup();
        render(
            <Tabs.Root defaultValue="a">
                <Tabs.List>
                    <Tabs.Trigger value="a">Alpha</Tabs.Trigger>
                    <Tabs.Trigger value="b">Beta</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="a">Alpha panel</Tabs.Content>
                <Tabs.Content value="b">Beta panel</Tabs.Content>
            </Tabs.Root>
        );
        const alphaTrigger = screen.getByText('Alpha');
        const betaTrigger = screen.getByText('Beta');
        const alphaPanel = screen.getByText('Alpha panel');

        expect(alphaTrigger).toHaveAttribute('data-state', 'active');
        expect(alphaPanel).toHaveAttribute('data-state', 'active');
        expect(betaTrigger).toHaveAttribute('data-state', 'inactive');

        await user.click(betaTrigger);
        const betaPanel = screen.getByText('Beta panel');
        expect(betaTrigger).toHaveAttribute('data-state', 'active');
        expect(betaPanel).toHaveAttribute('data-state', 'active');
        expect(alphaTrigger).toHaveAttribute('data-state', 'inactive');
    });

    test('controlled and uncontrolled values update correctly', async() => {
        const user = userEvent.setup();
        const Controlled = () => {
            const [value, setValue] = React.useState('one');
            return (
                <>
                    <div data-testid="current">{value}</div>
                    <Tabs.Root value={value} onValueChange={setValue}>
                        <Tabs.List>
                            <Tabs.Trigger value="one">One</Tabs.Trigger>
                            <Tabs.Trigger value="two">Two</Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content value="one">First</Tabs.Content>
                        <Tabs.Content value="two">Second</Tabs.Content>
                    </Tabs.Root>
                </>
            );
        };
        const { rerender } = render(<Controlled />);

        expect(screen.getByText('First')).toBeInTheDocument();
        await user.click(screen.getByText('Two'));
        expect(screen.getByText('Second')).toBeInTheDocument();
        expect(screen.getByTestId('current')).toHaveTextContent('two');

        // Uncontrolled with defaultValue
        rerender(
            <Tabs.Root defaultValue="b">
                <Tabs.List>
                    <Tabs.Trigger value="a">A</Tabs.Trigger>
                    <Tabs.Trigger value="b">B</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="a">Panel A</Tabs.Content>
                <Tabs.Content value="b">Panel B</Tabs.Content>
            </Tabs.Root>
        );

        expect(screen.getByText('Panel B')).toBeInTheDocument();
        await user.click(screen.getByText('A'));
        expect(screen.getByText('Panel A')).toBeInTheDocument();
    });

    test('no accessibility violations for selected tab', (done) => {
        const { container } = render(
            <Tabs.Root defaultValue="tab1">
                <Tabs.List>
                    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="tab1">Content 1</Tabs.Content>
                <Tabs.Content value="tab2">Content 2</Tabs.Content>
            </Tabs.Root>
        );

        runAxe(container).then((results) => {
            expect(results.violations.length).toBe(0);
            done();
        });
    });

    test('asChild preserves semantics and forwards refs', () => {
        const triggerRef = React.createRef<HTMLButtonElement>();
        const CustomButton = React.forwardRef<HTMLButtonElement, React.PropsWithChildren>(
            (props, ref) => (
                <button ref={ref} data-testid="custom" {...props} />
            )
        );
        CustomButton.displayName = 'CustomButton';

        render(
            <Tabs.Root defaultValue="x">
                <Tabs.List>
                    <Tabs.Trigger value="x" asChild ref={triggerRef}>
                        <CustomButton>Trigger</CustomButton>
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="x">X</Tabs.Content>
            </Tabs.Root>
        );

        const custom = screen.getByTestId('custom');
        expect(custom).toHaveAttribute('role', 'tab');
        expect(triggerRef.current).toBe(custom);
    });

    test('SSR renders and hydrates without mismatch', () => {
        const html = renderToString(
            <Tabs.Root defaultValue="tab1">
                <Tabs.List>
                    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="tab1">Content 1</Tabs.Content>
                <Tabs.Content value="tab2">Content 2</Tabs.Content>
            </Tabs.Root>
        );
        const container = document.createElement('div');
        container.innerHTML = html;
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        act(() => {
            hydrateRoot(container, (
                <Tabs.Root defaultValue="tab1">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1">Content 1</Tabs.Content>
                    <Tabs.Content value="tab2">Content 2</Tabs.Content>
                </Tabs.Root>
            ));
        });

        expect(errorSpy).not.toHaveBeenCalled();
        errorSpy.mockRestore();
    });

    test('RTL arrow navigation reverses direction', async() => {
        const user = userEvent.setup();
        render(
            <Tabs.Root defaultValue="l1" dir="rtl" activationMode="manual">
                <Tabs.List>
                    <Tabs.Trigger value="l1">Long label one</Tabs.Trigger>
                    <Tabs.Trigger value="l2">Long label two</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="l1">L1</Tabs.Content>
                <Tabs.Content value="l2">L2</Tabs.Content>
            </Tabs.Root>
        );
        const t1 = screen.getByText('Long label one');
        const t2 = screen.getByText('Long label two');

        await user.tab();
        expect(t1).toHaveFocus();

        await user.keyboard('{ArrowLeft}');
        expect(t2).toHaveFocus();
    });
});
