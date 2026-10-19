import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as sass from 'sass';
import path from 'path';
import Button from '../../Button/Button';
import Theme from '../../Theme/Theme';
import DropdownMenu from '../DropdownMenu';

it('keeps Button styling when composed as a dropdown trigger', async() => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn().mockReturnValue({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() });
    const style = document.createElement('style');
    style.textContent = ['../../Button/button.clarity.scss', '../dropdown-menu.clarity.scss']
        .map(file => sass.compile(path.resolve(__dirname, file)).css).join('\n');
    document.head.appendChild(style);
    try {
        render(
            <Theme classNamespace="rad-ui">
                <Button>Plain</Button>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild><Button>Composed</Button></DropdownMenu.Trigger>
                    <DropdownMenu.Content><DropdownMenu.Item label="Item">Item</DropdownMenu.Item></DropdownMenu.Content>
                </DropdownMenu.Root>
                <DropdownMenu.Root><DropdownMenu.Trigger>Default trigger</DropdownMenu.Trigger></DropdownMenu.Root>
            </Theme>
        );
        const plain = screen.getByRole('button', { name: 'Plain' });
        const composed = screen.getByRole('button', { name: 'Composed' });
        const trigger = screen.getByRole('button', { name: 'Default trigger' });
        expect(composed.classList.contains('rad-ui-dropdown-menu-trigger')).toBe(true);
        expect(getComputedStyle(composed).justifyContent).toBe(getComputedStyle(plain).justifyContent);
        expect(getComputedStyle(composed).width).toBe(getComputedStyle(plain).width);
        expect(getComputedStyle(trigger).justifyContent).toBe('space-between');
        expect(getComputedStyle(trigger).width).toBe('100%');
        await userEvent.click(composed);
        expect(screen.getByRole('menuitem', { name: 'Item' })).toBeTruthy();
    } finally {
        style.remove();
        window.matchMedia = originalMatchMedia;
    }
});
