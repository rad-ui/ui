import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TabNav from '../TabNav';

describe('TabNav right-to-left', () => {
    test('arrow keys follow reading direction in RTL', async() => {
        const user = userEvent.setup();
        render(
            <TabNav.Root dir="rtl" aria-label="Sections">
                <TabNav.Link value="one">One</TabNav.Link>
                <TabNav.Link value="two">Two</TabNav.Link>
                <TabNav.Link value="three">Three</TabNav.Link>
            </TabNav.Root>
        );
        expect(screen.getByRole('navigation')).toHaveAttribute('dir', 'rtl');
        screen.getByText('One').focus();
        await user.keyboard('{ArrowLeft}');
        expect(screen.getByText('Two')).toHaveFocus();
        await user.keyboard('{ArrowRight}');
        expect(screen.getByText('One')).toHaveFocus();
    });
});
