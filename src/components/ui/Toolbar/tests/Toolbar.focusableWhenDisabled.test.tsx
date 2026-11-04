import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toolbar from '../Toolbar';

describe('Toolbar focusableWhenDisabled', () => {
    test('disabled items are skipped by default', async() => {
        const user = userEvent.setup();
        render(
            <Toolbar.Root aria-label="Format">
                <Toolbar.Button>Bold</Toolbar.Button>
                <Toolbar.Button disabled>Italic</Toolbar.Button>
                <Toolbar.Button>Underline</Toolbar.Button>
            </Toolbar.Root>
        );
        screen.getByText('Bold').focus();
        await user.keyboard('{ArrowRight}');
        expect(screen.getByText('Underline')).toHaveFocus();
    });

    test('with focusableWhenDisabled they stay reachable but inert', async() => {
        const user = userEvent.setup();
        const onClick = jest.fn();
        render(
            <Toolbar.Root aria-label="Format">
                <Toolbar.Button>Bold</Toolbar.Button>
                <Toolbar.Button disabled focusableWhenDisabled onClick={onClick}>Italic</Toolbar.Button>
                <Toolbar.Input aria-label="Size" disabled focusableWhenDisabled defaultValue="12" />
            </Toolbar.Root>
        );
        screen.getByText('Bold').focus();
        await user.keyboard('{ArrowRight}');
        const italic = screen.getByText('Italic');
        expect(italic).toHaveFocus();
        expect(italic).toHaveAttribute('aria-disabled', 'true');
        await user.keyboard('{Enter}');
        await user.click(italic);
        expect(onClick).not.toHaveBeenCalled();
        await user.keyboard('{ArrowRight}');
        const size = screen.getByLabelText('Size');
        expect(size).toHaveFocus();
        await user.type(size, '4');
        expect(size).toHaveValue('12');
    });
});
