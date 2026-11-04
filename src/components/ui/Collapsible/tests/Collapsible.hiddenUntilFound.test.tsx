import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Collapsible from '../Collapsible';

describe('Collapsible hiddenUntilFound', () => {
    test('keeps closed content in the page as hidden until found', () => {
        render(
            <Collapsible.Root>
                <Collapsible.Trigger>Details</Collapsible.Trigger>
                <Collapsible.Content hiddenUntilFound>Searchable text</Collapsible.Content>
            </Collapsible.Root>
        );
        const content = screen.getByText('Searchable text');
        expect(content).toHaveAttribute('hidden', 'until-found');
        expect(content).toHaveAttribute('data-state', 'closed');
    });

    test('a find-in-page match opens it', () => {
        const onOpenChange = jest.fn();
        render(
            <Collapsible.Root onOpenChange={onOpenChange}>
                <Collapsible.Trigger>Details</Collapsible.Trigger>
                <Collapsible.Content hiddenUntilFound>Searchable text</Collapsible.Content>
            </Collapsible.Root>
        );
        const content = screen.getByText('Searchable text');
        fireEvent(content, new Event('beforematch'));
        expect(onOpenChange).toHaveBeenCalledWith(true);
        expect(content).toHaveAttribute('data-state', 'open');
        expect(content).not.toHaveAttribute('hidden');
    });

    test('without it, closed content is not rendered', () => {
        render(
            <Collapsible.Root>
                <Collapsible.Trigger>Details</Collapsible.Trigger>
                <Collapsible.Content>Gone</Collapsible.Content>
            </Collapsible.Root>
        );
        expect(screen.queryByText('Gone')).not.toBeInTheDocument();
    });
});
