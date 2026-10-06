import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckboxGroup from '../CheckboxGroup';

const Group = (props: Omit<React.ComponentProps<typeof CheckboxGroup.Root>, 'children'>) => (
    <CheckboxGroup.Root aria-label="Channels" {...props}>
        {['email', 'sms', 'push'].map((channel) => (
            <CheckboxGroup.Label key={channel}>
                <CheckboxGroup.Trigger value={channel}><CheckboxGroup.Indicator /></CheckboxGroup.Trigger>
                {channel}
            </CheckboxGroup.Label>
        ))}
    </CheckboxGroup.Root>
);

describe('CheckboxGroup form participation and keyboard', () => {
    test('required group is satisfied by any single checked item', async() => {
        const user = userEvent.setup();
        render(<form data-testid="form"><Group name="channels" required /></form>);
        const form = screen.getByTestId('form') as HTMLFormElement;

        expect(form.checkValidity()).toBe(false);
        await user.click(screen.getByText('sms'));
        expect(form.checkValidity()).toBe(true);
        expect(new FormData(form).getAll('channels')).toEqual(['sms']);
    });

    test('form reset restores the default selection', async() => {
        const user = userEvent.setup();
        render(<form data-testid="form"><Group name="channels" defaultValue={['email']} /></form>);
        const form = screen.getByTestId('form') as HTMLFormElement;

        await user.click(screen.getByText('push'));
        expect(new FormData(form).getAll('channels')).toEqual(['email', 'push']);

        act(() => {
            fireEvent.reset(form);
        });
        expect(new FormData(form).getAll('channels')).toEqual(['email']);
    });

    test('arrow down moves focus through a vertically stacked group', async() => {
        const user = userEvent.setup();
        render(<Group />);
        const [email, sms] = screen.getAllByRole('checkbox');

        await user.tab();
        expect(email).toHaveFocus();
        await user.keyboard('{ArrowDown}');
        expect(sms).toHaveFocus();
    });

    test('checkbox items do not expose aria-selected', () => {
        render(<Group />);
        screen.getAllByRole('checkbox').forEach((checkbox) => {
            expect(checkbox).not.toHaveAttribute('aria-selected');
        });
    });
});

describe('CheckboxGroup markup', () => {
    test('items render only phrasing content so they are valid inside <label>', () => {
        const { container } = render(<Group />);
        container.querySelectorAll('label').forEach((label) => {
            expect(label.querySelector('div')).toBeNull();
        });
    });
});
