import React from 'react';
import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from '~/components/ui/Tooltip/Tooltip';
import HoverCard from '~/components/ui/HoverCard/HoverCard';
import DropdownMenu from '~/components/ui/DropdownMenu/DropdownMenu';
import Select from '~/components/ui/Select/Select';

// Each popup reports open once its (absent) enter animation is done, and closed once it unmounts.
describe('onOpenChangeComplete across popups', () => {
    test('Tooltip', async() => {
        const onOpenChangeComplete = jest.fn();
        render(
            <Tooltip.Root onOpenChangeComplete={onOpenChangeComplete}>
                <Tooltip.Trigger>Hover</Tooltip.Trigger>
                <Tooltip.Content>Tip</Tooltip.Content>
            </Tooltip.Root>
        );
        await userEvent.hover(screen.getByText('Hover'));
        await waitFor(() => expect(onOpenChangeComplete).toHaveBeenLastCalledWith(true));
        await userEvent.unhover(screen.getByText('Hover'));
        await waitFor(() => expect(onOpenChangeComplete).toHaveBeenLastCalledWith(false));
    });

    test('HoverCard', async() => {
        jest.useFakeTimers();
        const onOpenChangeComplete = jest.fn();
        render(
            <HoverCard.Root openDelay={0} closeDelay={0} onOpenChangeComplete={onOpenChangeComplete}>
                <HoverCard.Trigger>@user</HoverCard.Trigger>
                <HoverCard.Content>Card</HoverCard.Content>
            </HoverCard.Root>
        );
        fireEvent.mouseEnter(screen.getByText('@user'));
        await act(async() => { jest.advanceTimersByTime(50); });
        expect(onOpenChangeComplete).toHaveBeenLastCalledWith(true);
        fireEvent.mouseLeave(screen.getByText('@user'));
        await act(async() => { jest.advanceTimersByTime(50); });
        expect(onOpenChangeComplete).toHaveBeenLastCalledWith(false);
        jest.useRealTimers();
    });

    test('DropdownMenu', async() => {
        const user = userEvent.setup();
        const onOpenChangeComplete = jest.fn();
        render(
            <DropdownMenu.Root onOpenChangeComplete={onOpenChangeComplete}>
                <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label="One">One</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        );
        await user.click(screen.getByText('Menu'));
        await waitFor(() => expect(onOpenChangeComplete).toHaveBeenLastCalledWith(true));
        await user.click(screen.getByText('One'));
        await waitFor(() => expect(onOpenChangeComplete).toHaveBeenLastCalledWith(false));
    });

    test('Select', async() => {
        const user = userEvent.setup();
        const onOpenChangeComplete = jest.fn();
        render(
            <Select.Root onOpenChangeComplete={onOpenChangeComplete}>
                <Select.Trigger>Fruit</Select.Trigger>
                <Select.Content>
                    <Select.Item value="apple">Apple</Select.Item>
                </Select.Content>
            </Select.Root>
        );
        await user.click(screen.getByText('Fruit'));
        await waitFor(() => expect(onOpenChangeComplete).toHaveBeenLastCalledWith(true));
        await user.click(screen.getByRole('option', { name: 'Apple' }));
        await waitFor(() => expect(onOpenChangeComplete).toHaveBeenLastCalledWith(false));
    });
});
