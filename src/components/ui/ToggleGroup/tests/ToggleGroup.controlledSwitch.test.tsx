import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggleGroup from '../ToggleGroup';

describe('ToggleGroup controlled/uncontrolled mode switching', () => {
    const items = (
        <>
            <ToggleGroup.Item value="one">One</ToggleGroup.Item>
            <ToggleGroup.Item value="two">Two</ToggleGroup.Item>
        </>
    );

    test('switches from uncontrolled to controlled', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();

        const { rerender } = render(
            <ToggleGroup.Root type="single" defaultValue={['one']}>{items}</ToggleGroup.Root>
        );

        await user.click(screen.getByText('Two'));
        expect(screen.getByText('Two')).toHaveAttribute('aria-pressed', 'true');

        rerender(
            <ToggleGroup.Root type="single" value={['one']} onValueChange={onValueChange}>
                {items}
            </ToggleGroup.Root>
        );

        expect(screen.getByText('One')).toHaveAttribute('aria-pressed', 'true');
        await user.click(screen.getByText('Two'));
        expect(onValueChange).toHaveBeenCalledWith(['two']);
    });

    test('switches from controlled to uncontrolled', async() => {
        const user = userEvent.setup();

        const { unmount } = render(
            <ToggleGroup.Root type="single" value={['two']} onValueChange={() => {}}>
                {items}
            </ToggleGroup.Root>
        );

        expect(screen.getByText('Two')).toHaveAttribute('aria-pressed', 'true');
        unmount();

        render(
            <ToggleGroup.Root type="single" defaultValue={['one']}>{items}</ToggleGroup.Root>
        );

        expect(screen.getByText('One')).toHaveAttribute('aria-pressed', 'true');
        await user.click(screen.getByText('Two'));
        expect(screen.getByText('Two')).toHaveAttribute('aria-pressed', 'true');
    });
});
