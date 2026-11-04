import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import Dialog from '../Dialog/Dialog';
import AlertDialog from '../AlertDialog/AlertDialog';
import Popover from '../Popover/Popover';
import Tooltip from '../Tooltip/Tooltip';
import HoverCard from '../HoverCard/HoverCard';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Select from '../Select/Select';
import Combobox from '../Combobox/Combobox';
import Field from '../Field/Field';
import Form from '../Form/Form';
import type { PopupActions } from '~/core/hooks/usePopupActions';
import type { FieldActions } from '../Field/fragments/FieldRoot';
import type { FormActions } from '../Form/Form';

const popups: Array<[string, (ref: React.Ref<PopupActions>, onOpenChange: (open: boolean, details: { reason: string }) => void) => React.ReactElement]> = [
    ['Dialog', (ref, onOpenChange) => <Dialog.Root defaultOpen actionsRef={ref} onOpenChange={onOpenChange}><Dialog.Trigger>T</Dialog.Trigger><Dialog.Portal><Dialog.Content><Dialog.Title>Body</Dialog.Title></Dialog.Content></Dialog.Portal></Dialog.Root>],
    ['AlertDialog', (ref, onOpenChange) => <AlertDialog.Root defaultOpen actionsRef={ref} onOpenChange={onOpenChange}><AlertDialog.Trigger>T</AlertDialog.Trigger><AlertDialog.Content><AlertDialog.Title>Body</AlertDialog.Title></AlertDialog.Content></AlertDialog.Root>],
    ['Popover', (ref, onOpenChange) => <Popover.Root defaultOpen actionsRef={ref} onOpenChange={onOpenChange}><Popover.Trigger>T</Popover.Trigger><Popover.Content>Body</Popover.Content></Popover.Root>],
    ['Tooltip', (ref, onOpenChange) => <Tooltip.Root defaultOpen actionsRef={ref} onOpenChange={onOpenChange}><Tooltip.Trigger>T</Tooltip.Trigger><Tooltip.Content>Body</Tooltip.Content></Tooltip.Root>],
    ['HoverCard', (ref, onOpenChange) => <HoverCard.Root defaultOpen actionsRef={ref} onOpenChange={onOpenChange}><HoverCard.Trigger>T</HoverCard.Trigger><HoverCard.Content>Body</HoverCard.Content></HoverCard.Root>],
    ['DropdownMenu', (ref, onOpenChange) => <DropdownMenu.Root defaultOpen actionsRef={ref} onOpenChange={onOpenChange}><DropdownMenu.Trigger>T</DropdownMenu.Trigger><DropdownMenu.Content><DropdownMenu.Item label="Body">Body</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Root>],
    ['Select', (ref, onOpenChange) => <Select.Root defaultOpen actionsRef={ref} onOpenChange={onOpenChange}><Select.Trigger><Select.Value placeholder="T" /></Select.Trigger><Select.Content><Select.Item value="a">Body</Select.Item></Select.Content></Select.Root>],
    ['Combobox', (ref, onOpenChange) => <Combobox.Root defaultOpen actionsRef={ref} onOpenChange={onOpenChange}><Combobox.Trigger>T</Combobox.Trigger><Combobox.Content><Combobox.Item value="a">Body</Combobox.Item></Combobox.Content></Combobox.Root>]
];

describe('actionsRef.close()', () => {
    test.each(popups)('%s closes with reason imperative-action', async(_name, make) => {
        const ref = React.createRef<PopupActions>();
        const reasons: string[] = [];
        render(make(ref, (open, details) => { if (!open) reasons.push(details.reason); }));
        expect(screen.getByText('Body')).toBeInTheDocument();
        act(() => ref.current!.close());
        expect(reasons).toContain('imperative-action');
        await waitFor(() => expect(screen.queryByText('Body')).not.toBeInTheDocument());
    });
});

describe('Field and Form actionsRef.validate()', () => {
    test('Field validate shows the error', () => {
        const ref = React.createRef<FieldActions>();
        render(
            <Field.Root name="email" required actionsRef={ref}>
                <Field.Label>Email</Field.Label><Field.Control /><Field.Error>Required</Field.Error>
            </Field.Root>
        );
        expect(screen.queryByText('Required')).not.toBeInTheDocument();
        let valid = true;
        act(() => { valid = ref.current!.validate(); });
        expect(valid).toBe(false);
        expect(screen.getByText('Required')).toBeInTheDocument();
    });

    test('Form validate checks one field by name, or all', () => {
        const ref = React.createRef<FormActions>();
        render(
            <Form actionsRef={ref}>
                <Field.Root name="a" required><Field.Label>A</Field.Label><Field.Control /><Field.Error>A missing</Field.Error></Field.Root>
                <Field.Root name="b" required><Field.Label>B</Field.Label><Field.Control /><Field.Error>B missing</Field.Error></Field.Root>
            </Form>
        );
        act(() => { ref.current!.validate('a'); });
        expect(screen.getByText('A missing')).toBeInTheDocument();
        expect(screen.queryByText('B missing')).not.toBeInTheDocument();
        let valid = true;
        act(() => { valid = ref.current!.validate(); });
        expect(valid).toBe(false);
        expect(screen.getByText('B missing')).toBeInTheDocument();
    });

    test('Field touched and dirty can be controlled', () => {
        render(<Field.Root name="x" touched dirty data-testid="root"><Field.Control aria-label="x" /></Field.Root>);
        expect(screen.getByTestId('root')).toHaveAttribute('data-touched');
        expect(screen.getByTestId('root')).toHaveAttribute('data-dirty');
    });

    test('Field.Control onValueChange', () => {
        const onValueChange = jest.fn();
        render(<Field.Root name="x"><Field.Control aria-label="x" onValueChange={onValueChange} /></Field.Root>);
        const input = screen.getByLabelText('x');
        act(() => { input.focus(); });
        require('@testing-library/react').fireEvent.change(input, { target: { value: 'hi' } });
        expect(onValueChange).toHaveBeenCalledWith('hi', expect.anything());
    });
});
