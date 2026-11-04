import React from 'react';
import { render, screen } from '@testing-library/react';
import Select from '../Select';

// Items rendered by a custom component are invisible to the element-tree label lookup.
const Fruits = () => (
    <>
        <Select.Item value="ap">Apple</Select.Item>
        <Select.Item value="bn">Banana</Select.Item>
    </>
);

const renderSelect = (props: Partial<React.ComponentProps<typeof Select.Root>>) => render(
    <Select.Root defaultValue="bn" {...props}>
        <Select.Trigger data-testid="trigger" />
        <Select.Content>
            <Fruits />
        </Select.Content>
    </Select.Root>
);

describe('Select items', () => {
    test('without items, a custom component hides the label until the list mounts', () => {
        renderSelect({});
        expect(screen.getByTestId('trigger')).toHaveTextContent('bn');
    });

    test('a record of labels shows the selected label before the list mounts', () => {
        renderSelect({ items: { ap: 'Apple', bn: 'Banana' } });
        expect(screen.getByTestId('trigger')).toHaveTextContent('Banana');
    });

    test('an array of { value, label } works too', () => {
        renderSelect({ items: [{ value: 'ap', label: 'Apple' }, { value: 'bn', label: 'Banana' }] });
        expect(screen.getByTestId('trigger')).toHaveTextContent('Banana');
    });

    test('controlled value changes pick the new label', () => {
        const { rerender } = render(
            <Select.Root value="ap" items={{ ap: 'Apple', bn: 'Banana' }}>
                <Select.Trigger data-testid="trigger" />
                <Select.Content><Fruits /></Select.Content>
            </Select.Root>
        );
        expect(screen.getByTestId('trigger')).toHaveTextContent('Apple');
        rerender(
            <Select.Root value="bn" items={{ ap: 'Apple', bn: 'Banana' }}>
                <Select.Trigger data-testid="trigger" />
                <Select.Content><Fruits /></Select.Content>
            </Select.Root>
        );
        expect(screen.getByTestId('trigger')).toHaveTextContent('Banana');
    });
});
