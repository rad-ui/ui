import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';

describe('Menu floating props merge', () => {
    test('preserves consumer onKeyDown on menu content', async() => {
        const user = userEvent.setup();
        const onKeyDown = jest.fn();

        render(
            <MenuPrimitive.Root defaultOpen>
                <MenuPrimitive.Trigger>Open</MenuPrimitive.Trigger>
                <MenuPrimitive.Portal>
                    <MenuPrimitive.Content {...({ onKeyDown, 'data-testid': 'menu-content' } as object)}>
                        <MenuPrimitive.Item label="Profile">Profile</MenuPrimitive.Item>
                    </MenuPrimitive.Content>
                </MenuPrimitive.Portal>
            </MenuPrimitive.Root>
        );

        const content = screen.getByTestId('menu-content');
        content.focus();
        await user.keyboard('{ArrowDown}');
        expect(onKeyDown).toHaveBeenCalled();
    });
});
