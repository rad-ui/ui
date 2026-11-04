import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu, { Root, Trigger, Content, Item, Portal } from '../Menu';
import DropdownMenu from '../../DropdownMenu/DropdownMenu';

describe('Menu', () => {
    test('is DropdownMenu under its common name', () => {
        expect(Menu).toBe(DropdownMenu);
        expect(Menu.Root).toBe(DropdownMenu.Root);
        expect(Menu.createHandle).toBe(DropdownMenu.createHandle);
    });

    test('named parts work (as with `import * as Menu`)', async() => {
        const user = userEvent.setup();
        const onSelect = jest.fn();
        render(
            <Root>
                <Trigger>Actions</Trigger>
                <Portal>
                    <Content>
                        <Item label="Rename" onSelect={onSelect}>Rename</Item>
                    </Content>
                </Portal>
            </Root>
        );
        await user.click(screen.getByText('Actions'));
        await user.click(await screen.findByRole('menuitem', { name: 'Rename' }));
        expect(onSelect).toHaveBeenCalled();
    });
});
