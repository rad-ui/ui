import React from 'react';
import { render, screen } from '@testing-library/react';

import Quote from '../Quote';

describe('Quote', () => {
    test('renders quote text', () => {
        render(
            <Quote>
                You must be the change you wish to see in the world. - Mahatma Gandhi
            </Quote>
        );

        expect(
            screen.getByText(
                'You must be the change you wish to see in the world. - Mahatma Gandhi'
            )
        ).toBeInTheDocument();
    });

    test('supports custom classes', () => {
        render(
            <Quote customRootClass='acme-corp' className='custom-class-name'>
                You must be the change you wish to see in the world. - Mahatma Gandhi
            </Quote>
        );

        const quoteElement = screen.getByText(
            'You must be the change you wish to see in the world. - Mahatma Gandhi'
        );
        expect(quoteElement).toHaveClass('acme-corp-quote');
        expect(quoteElement).toHaveClass('custom-class-name');
    });

    test('forwards refs to the underlying element', () => {
        const ref = React.createRef<HTMLQuoteElement>();
        render(<Quote ref={ref}>Quote</Quote>);
        expect(ref.current).not.toBeNull();
        expect(ref.current?.tagName).toBe('Q');
    });

    test('renders without console errors', () => {
        const consoleError = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        render(<Quote>Quote</Quote>);
        expect(consoleError).not.toHaveBeenCalled();
        consoleError.mockRestore();
    });
});
