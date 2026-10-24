import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Accordion from '../Accordion';

const Faq = () => (
    <Accordion.Root type="single" collapsible defaultValue="shipping">
        <Accordion.Item value="shipping">
            <Accordion.Header>
                <Accordion.Trigger>Shipping</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content hiddenUntilFound>Ships in two days.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="returns">
            <Accordion.Header>
                <Accordion.Trigger>Returns</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content hiddenUntilFound>Return within 30 days.</Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
);

describe('Accordion hiddenUntilFound', () => {
    test('closed items stay searchable and a match opens them', async() => {
        render(<Faq />);
        const returns = screen.getByText('Return within 30 days.').closest('[data-slot="accordion-content"]') as HTMLElement;
        expect(returns).toHaveAttribute('hidden', 'until-found');

        fireEvent(returns, new Event('beforematch'));
        expect(returns).toHaveAttribute('data-state', 'open');
        expect(returns).not.toHaveAttribute('hidden');
        // Single accordion: opening one closes the other, which becomes searchable
        // again once its closing animation ends.
        const shipping = screen.getByText('Ships in two days.').closest('[data-slot="accordion-content"]') as HTMLElement;
        expect(shipping).toHaveAttribute('data-state', 'closed');
        await waitFor(() => expect(shipping).toHaveAttribute('hidden', 'until-found'));
    });
});
