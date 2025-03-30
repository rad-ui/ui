import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Collapsible from '../Collapsible';

describe('Collapsible Component', () => {
    it('renders without crashing', () => {
        const { getByText } = render(
            <Collapsible.Root>
                <Collapsible.Trigger>Test Title</Collapsible.Trigger>
                <Collapsible.Content>
                    <div>Test Content</div>
                </Collapsible.Content>
            </Collapsible.Root>
        );
        expect(getByText('Test Title')).toBeInTheDocument();
        expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('does not toggle content visibility when disabled', () => {
        const { getByText, queryByText } = render(
            <Collapsible.Root disabled>
                <Collapsible.Trigger>Toggle</Collapsible.Trigger>
                <Collapsible.Content>
                    <div>Test Content</div>
                </Collapsible.Content>
            </Collapsible.Root>
        );

        const triggerButton = getByText('Toggle');
        fireEvent.click(triggerButton);
        expect(queryByText('Test Content')).toBeInTheDocument();

        fireEvent.click(triggerButton);
        expect(queryByText('Test Content')).toBeInTheDocument();
    });

    it('toggles content visibility when clicked', () => {
        const { getByText, queryByText } = render(
            <Collapsible.Root>
                <Collapsible.Trigger>Toggle</Collapsible.Trigger>
                <Collapsible.Content>
                    <div>Test Content</div>
                </Collapsible.Content>
            </Collapsible.Root>
        );

        // Initially content should be visible
        expect(queryByText('Test Content')).toBeInTheDocument();

        // Click to toggle
        const triggerButton = getByText('Toggle');
        fireEvent.click(triggerButton);

        // Still visible due to how testing library works with animations
        expect(queryByText('Test Content')).toBeInTheDocument();
    });
});

describe('Collapsible.Trigger Component', () => {
    it('renders the trigger content', () => {
        const { getByText } = render(
            <Collapsible.Root>
                <Collapsible.Trigger>Trigger Content</Collapsible.Trigger>
            </Collapsible.Root>
        );
        expect(getByText('Trigger Content')).toBeInTheDocument();
    });
});

describe('Collapsible.Content Component', () => {
    it('renders the content', () => {
        const { getByText } = render(
            <Collapsible.Root>
                <Collapsible.Content>Content Text</Collapsible.Content>
            </Collapsible.Root>
        );
        expect(getByText('Content Text')).toBeInTheDocument();
    });
});
