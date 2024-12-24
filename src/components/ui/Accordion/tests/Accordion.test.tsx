import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Accordion, { type AccordionProps } from '../Accordion';

const items: AccordionProps['items'] = [
    { title: 'One', content: <>This</> },
    { title: 'Two', content: <>is</> },
    { title: 'Three', content: <>content</> }
];

describe('Accordion', () => {
    test('renders accordion', () => {
        render(<Accordion items={[]} />);
        expect(screen.getByTestId('accordion-root')).toBeInTheDocument();
    });

    test('all content is hidden initially', () => {
        render(<Accordion items={items} />);
        expect(screen.getByText('One')).toBeInTheDocument();
        expect(screen.getByText('Two')).toBeInTheDocument();
        expect(screen.getByText('Three')).toBeInTheDocument();
        expect(screen.getByText('This')).toHaveAttribute('hidden');
        expect(screen.getByText('is')).toHaveAttribute('hidden');
        expect(screen.getByText('content')).toHaveAttribute('hidden');
    });

    test('clicking on a header toggles its content', async() => {
        render(<Accordion items={items} />);
        const header = screen.getByText('One');
        // click on the first header
        await userEvent.click(header);
        // first header's content is shown
        expect(screen.getByText('This')).not.toHaveAttribute('hidden');
        // click on the first header again
        await userEvent.click(header);
        // first header's content is hidden
        expect(screen.getByText('This')).toHaveAttribute('hidden');
    });

    test('clicking on a header while another is open closes the open header', async() => {
        render(<Accordion items={items} />);
        const firstHeader = screen.getByText('One');
        // click on the first header
        await userEvent.click(firstHeader);
        // first header's content is shown
        expect(screen.getByText('This')).not.toHaveAttribute('hidden');
        const secondHeader = screen.getByText('Two');
        // click on the second header
        await userEvent.click(secondHeader);
        // first header's content is hidden
        expect(screen.getByText('This')).toHaveAttribute('hidden');
        // second header's content is shown
        expect(screen.getByText('is')).not.toHaveAttribute('hidden');
    });

    describe('props to render are invalid', () => {
        beforeEach(() => {
            console.error = jest.fn();
        });

        test('renders accordion when title and content are invalid', () => {
            // @ts-expect-error: title and content should be a string and ReactNode, respectively
            render(<Accordion items={[{ title: { hi: 'bye' }, content: () => {} }]} />);
            expect(console.error).toHaveBeenCalledWith('title is not a valid React node');
            expect(console.error).toHaveBeenCalledWith('content is not a valid React node');
        });

        test('renders accordion when title and content are missing', () => {
            // @ts-expect-error: item should contain title and content keys
            render(<Accordion items={[{ extra: '' }]} />);
            expect(screen.getByTestId('accordion-root')).toBeInTheDocument();
            // nothing is printed to the console since a value is undefined if it's not given and undefined
            // is a valid React node
            expect(console.error).not.toHaveBeenCalled();
        });
    });
});
