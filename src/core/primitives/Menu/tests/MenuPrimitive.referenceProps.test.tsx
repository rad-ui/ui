import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';

describe('Menu reference props merge', () => {
    test('preserves consumer onClick on trigger', async() => {
        const user = userEvent.setup();
        const onClick = jest.fn();

        render(
            <MenuPrimitive.Root>
                <MenuPrimitive.Trigger {...({ onClick } as object)}>Open</MenuPrimitive.Trigger>
                <MenuPrimitive.Portal>
                    <MenuPrimitive.Content>
                        <MenuPrimitive.Item label="Profile">Profile</MenuPrimitive.Item>
                    </MenuPrimitive.Content>
                </MenuPrimitive.Portal>
            </MenuPrimitive.Root>
        );

        await user.click(screen.getByText('Open'));
        expect(onClick).toHaveBeenCalled();
        expect(screen.getByText('Profile')).toBeInTheDocument();
    });
});
