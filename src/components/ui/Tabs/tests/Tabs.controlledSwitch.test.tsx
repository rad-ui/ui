import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tabs from '../Tabs';

describe('Tabs controlled/uncontrolled mode switching', () => {
    test('switches from uncontrolled to controlled', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();

        const { rerender } = render(
            <Tabs.Root defaultValue="a">
                <Tabs.List>
                    <Tabs.Trigger value="a">A</Tabs.Trigger>
                    <Tabs.Trigger value="b">B</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="a">Panel A</Tabs.Content>
                <Tabs.Content value="b">Panel B</Tabs.Content>
            </Tabs.Root>
        );

        await user.click(screen.getByText('B'));
        expect(screen.getByText('Panel B')).toBeInTheDocument();

        rerender(
            <Tabs.Root value="a" onValueChange={onValueChange}>
                <Tabs.List>
                    <Tabs.Trigger value="a">A</Tabs.Trigger>
                    <Tabs.Trigger value="b">B</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="a">Panel A</Tabs.Content>
                <Tabs.Content value="b">Panel B</Tabs.Content>
            </Tabs.Root>
        );

        expect(screen.getByText('Panel A')).toBeInTheDocument();
        await user.click(screen.getByText('B'));
        expect(onValueChange).toHaveBeenCalledWith('b');
    });

    test('switches from controlled to uncontrolled', async() => {
        const user = userEvent.setup();

        const { rerender } = render(
            <Tabs.Root value="b" onValueChange={() => {}}>
                <Tabs.List>
                    <Tabs.Trigger value="a">A</Tabs.Trigger>
                    <Tabs.Trigger value="b">B</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="a">Panel A</Tabs.Content>
                <Tabs.Content value="b">Panel B</Tabs.Content>
            </Tabs.Root>
        );

        expect(screen.getByText('Panel B')).toBeInTheDocument();

        rerender(
            <Tabs.Root defaultValue="a">
                <Tabs.List>
                    <Tabs.Trigger value="a">A</Tabs.Trigger>
                    <Tabs.Trigger value="b">B</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="a">Panel A</Tabs.Content>
                <Tabs.Content value="b">Panel B</Tabs.Content>
            </Tabs.Root>
        );

        expect(screen.getByText('Panel A')).toBeInTheDocument();
        await user.click(screen.getByText('B'));
        expect(screen.getByText('Panel B')).toBeInTheDocument();
    });
});
