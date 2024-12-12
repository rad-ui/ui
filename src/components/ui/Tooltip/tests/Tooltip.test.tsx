import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from '../Tooltip';

describe('Tooltip', () => {
    test('renders component', () => {
        render(<Tooltip label='label'>Hover me</Tooltip>);
        expect(screen.getByText('Hover me')).toBeInTheDocument();
        expect(screen.queryByText('label')).not.toBeInTheDocument();
    });

    test('renders tooltip on hover and hides on unhover', async() => {
        render(<Tooltip label='label'>Hover me</Tooltip>);
        // tooltip is initially hidden
        expect(screen.queryByText('label')).not.toBeInTheDocument();
        const tooltip = screen.getByText('Hover me');
        // hover over the tooltip
        await userEvent.hover(tooltip);
        // tooltip is visible now
        expect(screen.getByText('label')).toBeInTheDocument();
        // unhover from the tooltip
        await userEvent.unhover(tooltip);
        // tooltip is hidden again
        expect(screen.queryByText('label')).not.toBeInTheDocument();
    });
});
