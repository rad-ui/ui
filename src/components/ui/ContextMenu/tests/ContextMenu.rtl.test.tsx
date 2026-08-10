import React from 'react';
import { render, screen } from '@testing-library/react';
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

describe('ContextMenu RTL', () => {
    beforeEach(() => mockMatchMedia());

    test('opens menu in rtl layout', async() => {
        const user = userEvent.setup();

        render(
            <div dir="rtl">
                <Theme>
                    <ContextMenu.Root>
                        <ContextMenu.Trigger>Area</ContextMenu.Trigger>
                        <ContextMenu.Portal>
                            <ContextMenu.Content>
                                <ContextMenu.Item label="Copy">Copy</ContextMenu.Item>
                            </ContextMenu.Content>
                        </ContextMenu.Portal>
                    </ContextMenu.Root>
                </Theme>
            </div>
        );

        const trigger = screen.getByText('Area');
        expect(trigger.closest('[dir="rtl"]')).not.toBeNull();

        await user.pointer({ keys: '[MouseRight>]', target: trigger });
        expect(screen.getByText('Copy')).toBeInTheDocument();
    });
});
