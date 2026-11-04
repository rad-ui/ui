import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggleGroup from '../ToggleGroup/ToggleGroup';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Select from '../Select/Select';

describe('small parity options', () => {
    test('ToggleGroup multiple', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(
            <ToggleGroup.Root multiple onValueChange={onValueChange} aria-label="Format">
                <ToggleGroup.Item value="b">B</ToggleGroup.Item>
                <ToggleGroup.Item value="i">I</ToggleGroup.Item>
            </ToggleGroup.Root>
        );
        await user.click(screen.getByText('B'));
        await user.click(screen.getByText('I'));
        expect(onValueChange).toHaveBeenLastCalledWith(['b', 'i']);
    });

    test('menu finalFocus sends focus elsewhere on close', async() => {
        const user = userEvent.setup();
        const target = React.createRef<HTMLButtonElement>();
        render(
            <>
                <button ref={target}>Elsewhere</button>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>Options</DropdownMenu.Trigger>
                    <DropdownMenu.Content finalFocus={target}>
                        <DropdownMenu.Item label="Profile">Profile</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </>
        );
        screen.getByText('Options').focus();
        await user.keyboard('{Enter}');
        await waitFor(() => expect(screen.getByText('Profile')).toHaveFocus());
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.getByText('Elsewhere')).toHaveFocus());
    });

    test('Select finalFocus={false} leaves focus alone after picking', async() => {
        const user = userEvent.setup();
        render(
            <Select.Root finalFocus={false} defaultOpen>
                <Select.Trigger data-testid="trigger"><Select.Value placeholder="Pick" /></Select.Trigger>
                <Select.Content><Select.Item value="a">A</Select.Item></Select.Content>
            </Select.Root>
        );
        await user.click(await screen.findByRole('option', { name: 'A' }));
        expect(screen.getByTestId('trigger')).not.toHaveFocus();
    });

    test('Select autoComplete reaches the hidden control', () => {
        const { container } = render(
            <Select.Root name="country" autoComplete="country">
                <Select.Trigger><Select.Value placeholder="Pick" /></Select.Trigger>
                <Select.Content><Select.Item value="in">India</Select.Item></Select.Content>
            </Select.Root>
        );
        expect(container.querySelector('select')).toHaveAttribute('autocomplete', 'country');
    });
});

describe('indicator forceMount', () => {
    test('Checkbox and RadioGroup indicators stay mounted while unchecked', async() => {
        const { default: Checkbox } = await import('../Checkbox/Checkbox');
        const { default: RadioGroup } = await import('../RadioGroup/RadioGroup');
        const { render: r, screen: s, fireEvent: f } = await import('@testing-library/react');
        const { container } = r(
            <>
                <Checkbox.Root aria-label="Terms"><Checkbox.Indicator forceMount data-testid="check" /></Checkbox.Root>
                <RadioGroup.Root defaultValue="a" aria-label="Plan">
                    <RadioGroup.Item value="a" aria-label="A"><RadioGroup.Indicator forceMount data-testid="radio-a" /></RadioGroup.Item>
                    <RadioGroup.Item value="b" aria-label="B"><RadioGroup.Indicator forceMount data-testid="radio-b" /></RadioGroup.Item>
                </RadioGroup.Root>
            </>
        );
        expect(s.getByTestId('check')).toHaveAttribute('data-state', 'unchecked');
        f.click(s.getByRole('checkbox', { name: 'Terms' }));
        expect(s.getByTestId('check')).toHaveAttribute('data-checked');
        expect(s.getByTestId('radio-a')).toHaveAttribute('data-state', 'checked');
        expect(s.getByTestId('radio-b')).toHaveAttribute('data-unchecked');
        expect(container).toBeTruthy();
    });
});
