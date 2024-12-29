import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Collapsible from '../Collapsible';

import CollapsibleHeader from '../fragments/CollapsibleHeader';
import CollapsibleItem from '../fragments/CollapsibleItem';
import CollapsibleTrigger from '../fragments/CollapsibleTrigger';

describe('Collapsible Component', () => {
    it('renders without crashing', () => {
        const { getByText } = render(
            <Collapsible title="Test Title">
                <div>Test Content</div>
            </Collapsible>
        );
        expect(getByText('Test Title')).toBeInTheDocument();
        expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('does not toggle content visibility when disabled', () => {
        const { getByText, queryByText } = render(
            <Collapsible title="Test Title" trigger={<button>Toggle</button>} disabled>
                <div>Test Content</div>
            </Collapsible>
        );

        const triggerButton = getByText('Toggle');
        fireEvent.click(triggerButton);
        expect(queryByText('Test Content')).toBeInTheDocument();

        fireEvent.click(triggerButton);
        expect(queryByText('Test Content')).toBeInTheDocument();
    });
});

describe('CollapsibleHeader Component', () => {
    it('renders the header content', () => {
        const { getByText } = render(<CollapsibleHeader>Header Content</CollapsibleHeader>);
        expect(getByText('Header Content')).toBeInTheDocument();
    });
});

describe('CollapsibleItem Component', () => {
    it('renders the item content', () => {
        const { getByText } = render(<CollapsibleItem>Item Content</CollapsibleItem>);
        expect(getByText('Item Content')).toBeInTheDocument();
    });
});

describe('CollapsibleTrigger Component', () => {
    it('renders the trigger content', () => {
        const { getByText } = render(<CollapsibleTrigger>Trigger Content</CollapsibleTrigger>);
        expect(getByText('Trigger Content')).toBeInTheDocument();
    });
});
