import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../Select';

const Page = ({ modal, onOutside }: { modal?: boolean; onOutside?: () => void }) => (
    <>
        <Select.Root modal={modal}>
            <Select.Trigger>Fruit</Select.Trigger>
            <Select.Portal>
                <Select.Content>
                    <Select.Item value="apple">Apple</Select.Item>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
        <button onClick={onOutside}>Outside</button>
    </>
);

const backdrop = () => document.querySelector('[data-slot="combobox-backdrop"]') as HTMLElement | null;

describe('Select modal', () => {
    test('modal: locks scroll; an outside press closes without reaching the page', async() => {
        const user = userEvent.setup();
        const onOutside = jest.fn();
        render(<Page modal onOutside={onOutside} />);
        await user.click(screen.getByText('Fruit'));
        await screen.findByRole('option', { name: 'Apple' });
        expect(backdrop()).not.toBeNull();
        await waitFor(() => expect(document.body.style.overflow).toBe('hidden'));
        const layer = backdrop() as HTMLElement;
        fireEvent.pointerDown(layer);
        fireEvent.mouseDown(layer);
        fireEvent.click(layer);
        await waitFor(() => expect(screen.queryByRole('option', { name: 'Apple' })).not.toBeInTheDocument());
        expect(onOutside).not.toHaveBeenCalled();
        expect(backdrop()).toBeNull();
        await waitFor(() => expect(document.body.style.overflow).not.toBe('hidden'));
    });

    test('not modal (default): no backdrop, no scroll lock', async() => {
        const user = userEvent.setup();
        render(<Page />);
        await user.click(screen.getByText('Fruit'));
        await screen.findByRole('option', { name: 'Apple' });
        expect(backdrop()).toBeNull();
        expect(document.body.style.overflow).not.toBe('hidden');
    });

    test('selecting still works when modal', async() => {
        const user = userEvent.setup();
        render(<Page modal />);
        await user.click(screen.getByText('Fruit'));
        await user.click(await screen.findByRole('option', { name: 'Apple' }));
        expect(screen.getByText('Apple')).toBeInTheDocument();
        await waitFor(() => expect(backdrop()).toBeNull());
    });
});
