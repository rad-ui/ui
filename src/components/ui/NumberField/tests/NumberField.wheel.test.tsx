import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NumberField from '../NumberField';

const Example = (props: Partial<React.ComponentProps<typeof NumberField.Root>>) => (
    <NumberField.Root defaultValue={5} {...props}>
        <NumberField.Input aria-label="Count" />
    </NumberField.Root>
);

describe('NumberField allowWheelScrub', () => {
    test('the wheel steps the value while focused', () => {
        render(<Example allowWheelScrub />);
        const input = screen.getByRole('spinbutton', { name: 'Count' });
        input.focus();
        fireEvent.wheel(input, { deltaY: -100 });
        expect(input).toHaveValue(6);
        fireEvent.wheel(input, { deltaY: 100, shiftKey: true });
        expect(input).toHaveValue(-4);
    });

    test('the wheel does nothing while not focused', () => {
        render(<Example allowWheelScrub />);
        const input = screen.getByRole('spinbutton', { name: 'Count' });
        fireEvent.wheel(input, { deltaY: -100 });
        expect(input).toHaveValue(5);
    });

    test('off by default', () => {
        render(<Example />);
        const input = screen.getByRole('spinbutton', { name: 'Count' });
        input.focus();
        fireEvent.wheel(input, { deltaY: -100 });
        expect(input).toHaveValue(5);
    });
});
