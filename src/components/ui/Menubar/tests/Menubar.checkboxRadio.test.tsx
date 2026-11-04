import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menubar from '../Menubar';

describe('Menubar checkbox and radio items', () => {
    test('a checkbox item toggles inside a menubar menu', async() => {
        const user = userEvent.setup();
        const onCheckedChange = jest.fn();
        render(
            <Menubar.Root aria-label="Application">
                <Menubar.Menu>
                    <Menubar.Trigger>View</Menubar.Trigger>
                    <Menubar.Content>
                        <Menubar.CheckboxItem onCheckedChange={onCheckedChange}>Word wrap</Menubar.CheckboxItem>
                        <Menubar.RadioGroup defaultValue="light">
                            <Menubar.RadioItem value="light">Light</Menubar.RadioItem>
                            <Menubar.RadioItem value="dark">Dark</Menubar.RadioItem>
                        </Menubar.RadioGroup>
                    </Menubar.Content>
                </Menubar.Menu>
            </Menubar.Root>
        );
        await user.click(screen.getByText('View'));
        await user.click(screen.getByRole('menuitemcheckbox', { name: 'Word wrap' }));
        expect(onCheckedChange).toHaveBeenCalledWith(true);
        await user.click(screen.getByRole('menuitemradio', { name: 'Dark' }));
        expect(screen.getByRole('menuitemradio', { name: 'Dark' })).toHaveAttribute('aria-checked', 'true');
    });
});
