import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TabNav from '../TabNav';

describe('TabNav controlled switch', () => {
    const tabNav = (rootProps: React.ComponentProps<typeof TabNav.Root>) => (
        <TabNav.Root {...rootProps}>
            <TabNav.Link value="one">One</TabNav.Link>
            <TabNav.Link value="two">Two</TabNav.Link>
        </TabNav.Root>
    );

    test('switches from uncontrolled defaultValue to controlled value', () => {
        const onValueChange = jest.fn();

        const { rerender } = render(tabNav({ defaultValue: 'one' }));

        expect(screen.getByText('One')).toHaveAttribute('aria-current', 'page');

        rerender(tabNav({ value: 'two', onValueChange }));

        expect(screen.getByText('Two')).toHaveAttribute('aria-current', 'page');

        fireEvent.click(screen.getByText('One'));
        expect(onValueChange).toHaveBeenCalledWith('one');
    });

    test('switches from controlled value to uncontrolled defaultValue', () => {
        const { rerender } = render(tabNav({ value: 'two' }));

        expect(screen.getByText('Two')).toHaveAttribute('aria-current', 'page');

        rerender(tabNav({ defaultValue: 'one' }));

        expect(screen.getByText('One')).toHaveAttribute('aria-current', 'page');
    });
});
