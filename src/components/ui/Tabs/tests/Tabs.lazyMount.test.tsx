import React from 'react';
import { render, screen } from '@testing-library/react';
import Tabs from '../Tabs';

describe('Tabs lazy mount behavior', () => {
    test('only mounts the active tab panel by default', () => {
        render(
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
        expect(screen.queryByText('Panel B')).not.toBeInTheDocument();
    });

    test('forceMount keeps inactive panels in the DOM', () => {
        render(
            <Tabs.Root defaultValue="a">
                <Tabs.List>
                    <Tabs.Trigger value="a">A</Tabs.Trigger>
                    <Tabs.Trigger value="b">B</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="a">Panel A</Tabs.Content>
                <Tabs.Content value="b" forceMount>Panel B</Tabs.Content>
            </Tabs.Root>
        );

        expect(screen.getByText('Panel A')).toBeInTheDocument();
        expect(screen.getByText('Panel B')).toBeInTheDocument();
        expect(screen.getByText('Panel B')).toHaveAttribute('data-state', 'inactive');
    });
});
