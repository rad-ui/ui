import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../Select';
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

describe('Select keyboard paths', () => {
    beforeEach(() => mockMatchMedia());

    const select = () => (
        <Theme>
            <Select.Root>
                <Select.Trigger>choose</Select.Trigger>
                <Select.Portal>
                    <Select.Content>
                        <Select.Item value="apple">Apple</Select.Item>
                        <Select.Item value="banana">Banana</Select.Item>
                        <Select.Item value="orange">Orange</Select.Item>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </Theme>
    );

    test('arrow keys navigate, home/end jump, escape closes', async() => {
        const user = userEvent.setup();
        render(select());

        const trigger = screen.getByText('choose');
        await user.click(trigger);

        const options = screen.getAllByRole('option');

        await user.keyboard('{ArrowDown}');
        expect(options[0]).toHaveAttribute('data-active', 'true');

        await user.keyboard('{ArrowDown}');
        expect(options[1]).toHaveAttribute('data-active', 'true');

        await user.keyboard('{End}');
        expect(options[2]).toHaveAttribute('data-active', 'true');

        await user.keyboard('{Home}');
        expect(options[0]).toHaveAttribute('data-active', 'true');

        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByText('Apple')).not.toBeInTheDocument());
        expect(trigger).toHaveFocus();
    });
});
