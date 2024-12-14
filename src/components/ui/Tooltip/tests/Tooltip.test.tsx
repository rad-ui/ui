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

    describe('Labels', () => {
        test('renders tooltip on hover and hides on unhover', async() => {
            render(<Tooltip label='label'>Hover me</Tooltip>);
            // tooltip is initially hidden
            expect(screen.queryByText('label')).not.toBeInTheDocument();
            const text = screen.getByText('Hover me');
            // hover over the trigger text
            await userEvent.hover(text);
            // tooltip is visible now
            expect(screen.getByText('label')).toBeInTheDocument();
            // unhover from the trigger text
            await userEvent.unhover(text);
            // tooltip is hidden again
            expect(screen.queryByText('label')).not.toBeInTheDocument();
        });

        test('renders tooltip when label is not given', async() => {
            render(<Tooltip>Hover me</Tooltip>);
            // tooltip is initially hidden
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            const text = screen.getByText('Hover me');
            // hover over the trigger text
            await userEvent.hover(text);
            // tooltip is visible now
            expect(screen.getByRole('dialog')).toBeInTheDocument();
            // unhover from the trigger text
            await userEvent.unhover(text);
            // tooltip is hidden again
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        test('renders tooltip when label is of an invalid type', async() => {
            // @ts-expect-error: label should be a string
            expect(() => render(<Tooltip label={42}>Hover me</Tooltip>)).not.toThrow();

            // @ts-expect-error:label should be a string
            expect(() => render(<Tooltip label={true}>Hover me</Tooltip>)).not.toThrow();

            // @ts-expect-error: label should be a string
            expect(() => render(<Tooltip label={null}>Hover me</Tooltip>)).not.toThrow();
        });
    });
});
