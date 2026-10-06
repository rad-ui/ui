import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Combobox from '../Combobox';

const Components = (props: Omit<React.ComponentProps<typeof Combobox.Root>, 'children'>) => (
    <Combobox.Root {...props}>
        <Combobox.Trigger>Choose component</Combobox.Trigger>
        <Combobox.Content>
            <Combobox.Search placeholder="Search components..." />
            <Combobox.Item value="button">Button</Combobox.Item>
            <Combobox.Item value="dialog">Dialog</Combobox.Item>
            <Combobox.Item value="scroll-area">Scroll Area</Combobox.Item>
        </Combobox.Content>
    </Combobox.Root>
);

describe('Combobox regressions', () => {
    test('opening moves focus into the search field once the list is positioned', async() => {
        // Real browsers hide the list until it is positioned; jsdom skips that unless the UA says otherwise.
        const userAgent = jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 Chrome/126');
        try {
            const user = userEvent.setup();
            render(<Components />);
            await user.click(screen.getByText('Choose component'));

            await waitFor(() => expect(screen.getByPlaceholderText('Search components...')).toHaveFocus());
        } finally {
            userAgent.mockRestore();
        }
    });

    test('search filters by visible label and keyboard selection shows the label', async() => {
        const user = userEvent.setup();
        render(<Components />);
        const trigger = screen.getByText('Choose component');

        await user.click(trigger);
        const search = screen.getByPlaceholderText('Search components...');
        search.focus();
        await user.keyboard('scroll a');

        const options = Array.from(document.querySelectorAll<HTMLElement>('[role="option"]'));
        const visible = options.filter((option) => option.style.display !== 'none');
        expect(visible.map((option) => option.textContent)).toEqual(['Scroll Area']);

        await user.keyboard('{ArrowDown}{Enter}');
        await waitFor(() => expect(trigger).toHaveTextContent('Scroll Area'));
    });

    test('the keyboard-highlighted option is marked active and options are not tab stops', async() => {
        const user = userEvent.setup();
        render(<Components />);

        await user.click(screen.getByText('Choose component'));
        screen.getByPlaceholderText('Search components...').focus();
        await user.keyboard('{ArrowDown}');

        await waitFor(() => {
            const active = screen.getAllByRole('option').filter((option) => option.getAttribute('data-active') === 'true');
            expect(active).toHaveLength(1);
        });
        screen.getAllByRole('option').forEach((option) => expect(option).toHaveAttribute('tabindex', '-1'));
    });
});

describe('Combobox search keyboard', () => {
    test('Enter selects the first match after typing without any arrow key', async() => {
        const user = userEvent.setup();
        render(<Components />);
        const trigger = screen.getByText('Choose component');

        await user.click(trigger);
        screen.getByPlaceholderText('Search components...').focus();
        await user.keyboard('dia{Enter}');

        await waitFor(() => expect(trigger).toHaveTextContent('Dialog'));
    });

    test('typing a space keeps the list open', async() => {
        const user = userEvent.setup();
        render(<Components />);

        await user.click(screen.getByText('Choose component'));
        const search = screen.getByPlaceholderText('Search components...');
        search.focus();
        await user.keyboard('scroll ');

        expect(search).toHaveValue('scroll ');
        expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
});

describe('Combobox ARIA structure', () => {
    test('the search input sits outside the listbox and controls it', async() => {
        const user = userEvent.setup();
        render(<Components />);
        await user.click(screen.getByText('Choose component'));

        const search = screen.getByPlaceholderText('Search components...');
        const listbox = screen.getByRole('listbox');
        expect(listbox).not.toContainElement(search);
        expect(search).toHaveAttribute('role', 'combobox');
        expect(search).toHaveAttribute('aria-controls', listbox.id);
        expect(search).toHaveAttribute('aria-autocomplete', 'list');
        expect(search).toHaveAttribute('aria-expanded', 'true');

        search.focus();
        await user.keyboard('{ArrowDown}');
        await waitFor(() => {
            const activeId = search.getAttribute('aria-activedescendant');
            expect(activeId).toBeTruthy();
            expect(listbox.querySelector(`[id="${activeId}"]`)).toHaveAttribute('role', 'option');
        });
        Array.from(listbox.children).forEach((child) => expect(child).toHaveAttribute('role', 'option'));
    });

    test('without a search part the popup itself is the listbox', async() => {
        const user = userEvent.setup();
        render(
            <Combobox.Root>
                <Combobox.Trigger>pick</Combobox.Trigger>
                <Combobox.Content data-testid="content">
                    <Combobox.Item value="a">A</Combobox.Item>
                </Combobox.Content>
            </Combobox.Root>
        );
        await user.click(screen.getByText('pick'));
        expect(screen.getByTestId('content')).toHaveAttribute('role', 'listbox');
    });
});
