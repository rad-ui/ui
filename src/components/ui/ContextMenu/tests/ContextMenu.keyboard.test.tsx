import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContextMenu from '../ContextMenu';
import Theme from '~/components/ui/Theme/Theme';

const mockMatchMedia = () => {
    if ('matchMedia' in window && typeof window.matchMedia === 'function') return;
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(() => ({
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn()
        }))
    });
};

describe('ContextMenu keyboard paths', () => {
    beforeEach(() => mockMatchMedia());

    const menu = () => (
        <Theme>
            <ContextMenu.Root>
                <ContextMenu.Trigger>Area</ContextMenu.Trigger>
                <ContextMenu.Portal>
                    <ContextMenu.Content>
                        <ContextMenu.Item label="One">One</ContextMenu.Item>
                        <ContextMenu.Item label="Two">Two</ContextMenu.Item>
                        <ContextMenu.Item label="Three">Three</ContextMenu.Item>
                    </ContextMenu.Content>
                </ContextMenu.Portal>
            </ContextMenu.Root>
        </Theme>
    );

    test('arrow keys navigate items after context menu opens', async() => {
        const user = userEvent.setup();
        render(menu());

        await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Area') });

        const one = screen.getByText('One');
        const two = screen.getByText('Two');
        const three = screen.getByText('Three');

        await user.keyboard('{ArrowDown}');
        expect(one).toHaveFocus();

        await user.keyboard('{ArrowDown}');
        expect(two).toHaveFocus();

        await user.keyboard('{End}');
        expect(three).toHaveFocus();

        await user.keyboard('{Home}');
        expect(one).toHaveFocus();
    });

    test('escape closes menu and returns focus to trigger', async() => {
        const user = userEvent.setup();
        render(menu());

        const trigger = screen.getByText('Area');
        await user.pointer({ keys: '[MouseRight>]', target: trigger });

        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByText('One')).not.toBeInTheDocument());
        expect(trigger).toHaveFocus();
    });
});

describe('ContextMenu keyboard open', () => {
    beforeEach(() => mockMatchMedia());

    test('Shift+F10 opens the menu and focuses the first item', async() => {
        const user = userEvent.setup();
        render(
            <ContextMenu.Root>
                <ContextMenu.Trigger>Area</ContextMenu.Trigger>
                <ContextMenu.Portal>
                    <ContextMenu.Content>
                        <ContextMenu.Item label="One">One</ContextMenu.Item>
                        <ContextMenu.Item label="Two">Two</ContextMenu.Item>
                    </ContextMenu.Content>
                </ContextMenu.Portal>
            </ContextMenu.Root>
        );

        const trigger = screen.getByText('Area');
        trigger.focus();
        await user.keyboard('{Shift>}{F10}{/Shift}');

        await waitFor(() => expect(screen.getByText('One')).toHaveFocus());
        expect(screen.getByRole('menu')).toBeInTheDocument();

        await user.keyboard('{ArrowDown}');
        expect(screen.getByText('Two')).toHaveFocus();

        await user.keyboard('{Enter}');
        await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    });
});

describe('ContextMenu trigger markup', () => {
    test('span trigger carries no button-only attributes', () => {
        render(
            <ContextMenu.Root>
                <ContextMenu.Trigger>Area</ContextMenu.Trigger>
                <ContextMenu.Content>
                    <ContextMenu.Item label="One">One</ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Root>
        );
        const trigger = screen.getByText('Area');
        expect(trigger.tagName).toBe('SPAN');
        expect(trigger).not.toHaveAttribute('type');
        expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    });
});
