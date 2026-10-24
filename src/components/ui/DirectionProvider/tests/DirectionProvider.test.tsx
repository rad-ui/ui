import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DirectionProvider, { useDirection } from '../DirectionProvider';
import Tabs from '~/components/ui/Tabs/Tabs';
import ToggleGroup from '~/components/ui/ToggleGroup/ToggleGroup';
import RadioGroup from '~/components/ui/RadioGroup/RadioGroup';

const Probe = ({ dir }: { dir?: 'ltr' | 'rtl' }) => <span data-testid="probe">{useDirection(dir) ?? 'unset'}</span>;

const TabsExample = (props: { dir?: 'ltr' | 'rtl' }) => (
    <Tabs.Root defaultValue="one" {...props}>
        <Tabs.List>
            <Tabs.Trigger value="one">One</Tabs.Trigger>
            <Tabs.Trigger value="two">Two</Tabs.Trigger>
            <Tabs.Trigger value="three">Three</Tabs.Trigger>
        </Tabs.List>
    </Tabs.Root>
);

describe('DirectionProvider', () => {
    test('useDirection reads the provider, and a prop wins', () => {
        const { rerender } = render(<Probe />);
        expect(screen.getByTestId('probe')).toHaveTextContent('unset');
        rerender(<DirectionProvider dir="rtl"><Probe /></DirectionProvider>);
        expect(screen.getByTestId('probe')).toHaveTextContent('rtl');
        rerender(<DirectionProvider dir="rtl"><Probe dir="ltr" /></DirectionProvider>);
        expect(screen.getByTestId('probe')).toHaveTextContent('ltr');
    });

    test('Tabs arrow keys follow the provider direction', async() => {
        const user = userEvent.setup();
        render(<DirectionProvider dir="rtl"><TabsExample /></DirectionProvider>);
        screen.getByRole('tab', { name: 'One' }).focus();
        await user.keyboard('{ArrowLeft}');
        expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
        expect(screen.getByRole('tablist').closest('[dir]')).toHaveAttribute('dir', 'rtl');
    });

    test('a component dir prop overrides the provider', async() => {
        const user = userEvent.setup();
        render(<DirectionProvider dir="rtl"><TabsExample dir="ltr" /></DirectionProvider>);
        screen.getByRole('tab', { name: 'One' }).focus();
        await user.keyboard('{ArrowRight}');
        expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
    });

    test('ToggleGroup follows the provider', async() => {
        const user = userEvent.setup();
        render(
            <DirectionProvider dir="rtl">
                <ToggleGroup.Root type="single">
                    <ToggleGroup.Item value="a">A</ToggleGroup.Item>
                    <ToggleGroup.Item value="b">B</ToggleGroup.Item>
                    <ToggleGroup.Item value="c">C</ToggleGroup.Item>
                </ToggleGroup.Root>
            </DirectionProvider>
        );
        screen.getByRole('button', { name: 'A' }).focus();
        await user.keyboard('{ArrowLeft}');
        expect(screen.getByRole('button', { name: 'B' })).toHaveFocus();
    });

    test('RadioGroup follows the provider', async() => {
        const user = userEvent.setup();
        render(
            <DirectionProvider dir="rtl">
                <RadioGroup.Root defaultValue="a" aria-label="Letters">
                    <RadioGroup.Item value="a">A</RadioGroup.Item>
                    <RadioGroup.Item value="b">B</RadioGroup.Item>
                    <RadioGroup.Item value="c">C</RadioGroup.Item>
                </RadioGroup.Root>
            </DirectionProvider>
        );
        screen.getAllByRole('radio')[0].focus();
        await user.keyboard('{ArrowLeft}');
        expect(screen.getAllByRole('radio')[1]).toHaveFocus();
    });
});
