import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Theme from '~/components/ui/Theme/Theme';
import Drawer from '../Drawer';

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

describe('Drawer RTL', () => {
    beforeEach(() => mockMatchMedia());

    test('opens drawer content in rtl layout', async() => {
        const user = userEvent.setup();

        render(
            <div dir="rtl">
                <Theme>
                    <Drawer.Root>
                        <Drawer.Trigger>Open</Drawer.Trigger>
                        <Drawer.Portal>
                            <Drawer.Content>Drawer body</Drawer.Content>
                        </Drawer.Portal>
                    </Drawer.Root>
                </Theme>
            </div>
        );

        const trigger = screen.getByText('Open');
        expect(trigger.closest('[dir="rtl"]')).not.toBeNull();

        await user.click(trigger);
        expect(screen.getByText('Drawer body')).toBeInTheDocument();
    });
});
