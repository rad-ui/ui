import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menubar from '../Menubar';
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

describe('Menubar RTL', () => {
    beforeEach(() => mockMatchMedia());

    test('opens menu content in rtl layout', async() => {
        const user = userEvent.setup();

        render(
            <div dir="rtl">
                <Theme>
                    <Menubar.Root>
                        <Menubar.Menu>
                            <Menubar.Trigger>File</Menubar.Trigger>
                            <Menubar.Portal>
                                <Menubar.Content>
                                    <Menubar.Item>New</Menubar.Item>
                                </Menubar.Content>
                            </Menubar.Portal>
                        </Menubar.Menu>
                    </Menubar.Root>
                </Theme>
            </div>
        );

        const trigger = screen.getByText('File');
        expect(trigger.closest('[dir="rtl"]')).not.toBeNull();

        await user.click(trigger);
        expect(screen.getByText('New')).toBeInTheDocument();
    });
});
