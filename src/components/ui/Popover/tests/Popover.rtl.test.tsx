import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from '../Popover';
import Select from '../../Select/Select';
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

describe('RTL overlay components', () => {
    beforeEach(() => mockMatchMedia());

    test('Popover renders and opens in rtl', async() => {
        const user = userEvent.setup();

        render(
            <div dir="rtl">
                <Theme>
                    <Popover.Root>
                        <Popover.Trigger>Open</Popover.Trigger>
                        <Popover.Portal>
                            <Popover.Content>RTL popover</Popover.Content>
                        </Popover.Portal>
                    </Popover.Root>
                </Theme>
            </div>
        );

        const trigger = screen.getByText('Open');
        expect(trigger.closest('[dir="rtl"]')).not.toBeNull();

        await user.click(trigger);
        expect(screen.getByText('RTL popover')).toBeInTheDocument();
    });

    test('Select opens listbox in rtl', async() => {
        const user = userEvent.setup();

        render(
            <div dir="rtl">
                <Theme>
                    <Select.Root>
                        <Select.Trigger />
                        <Select.Portal>
                            <Select.Content>
                                <Select.Item value="apple">Apple</Select.Item>
                            </Select.Content>
                        </Select.Portal>
                    </Select.Root>
                </Theme>
            </div>
        );

        const trigger = screen.getByRole('combobox');
        expect(trigger.closest('[dir="rtl"]')).not.toBeNull();

        await user.click(trigger);
        expect(screen.getByText('Apple')).toBeInTheDocument();
    });
});
