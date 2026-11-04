import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextField from '../TextField';
import TextArea from '../../TextArea/TextArea';

describe('onValueChange', () => {
    test('TextField reports the new text after onChange', async() => {
        const user = userEvent.setup();
        const calls: string[] = [];
        const onChange = jest.fn(() => calls.push('change'));
        const onValueChange = jest.fn((value: string) => calls.push(`value:${value}`));
        render(<TextField aria-label="Name" onChange={onChange} onValueChange={onValueChange} />);
        await user.type(screen.getByLabelText('Name'), 'Ad');
        expect(onValueChange).toHaveBeenLastCalledWith('Ad', expect.objectContaining({ type: 'change' }));
        expect(calls).toEqual(['change', 'value:A', 'change', 'value:Ad']);
    });

    test('TextField.Input and Reset', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(
            <TextField.Root>
                <TextField.Input aria-label="Search" defaultValue="rad" onValueChange={onValueChange} />
                <TextField.Reset aria-label="Clear" />
            </TextField.Root>
        );
        await user.type(screen.getByLabelText('Search'), '!');
        expect(onValueChange).toHaveBeenLastCalledWith('rad!', expect.anything());
        await user.click(screen.getByLabelText('Clear'));
        expect(onValueChange).toHaveBeenLastCalledWith('', expect.anything());
    });

    test('TextArea reports the new text', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<TextArea aria-label="Bio" onValueChange={onValueChange} />);
        await user.type(screen.getByLabelText('Bio'), 'Hi');
        expect(onValueChange).toHaveBeenLastCalledWith('Hi', expect.anything());
    });
});
