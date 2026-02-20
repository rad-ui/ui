import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Label from '../Label';

/**
 * Tests for Label component ensuring proper linkage and accessibility.
 */
describe('Label', () => {
    test('associates with form field via htmlFor', () => {
        render(
            <div>
                <Label htmlFor="email">Email</Label>
                <input id="email" />
            </div>
        );
        const input = screen.getByLabelText('Email');
        expect(input).toBeInTheDocument();
    });

    test('clicking label focuses associated input', async () => {
        const user = userEvent.setup();
        render(
            <div>
                <Label htmlFor="name">Name</Label>
                <input id="name" />
            </div>
        );
        const label = screen.getByText('Name');
        const input = screen.getByLabelText('Name');
        await user.click(label);
        expect(document.activeElement).toBe(input);
    });
});
