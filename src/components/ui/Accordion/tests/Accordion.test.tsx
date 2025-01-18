import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import * as axe from 'axe-core';

import Accordion, { AccordionProps } from '../Accordion';

const defaultItems: AccordionProps['items'] = [
    { title: 'Item 1', content: <div>Content 1</div> },
    { title: 'Item 2', content: <div>Content 2</div> },
    { title: 'Item 3', content: <div>Content 3</div> }
];

describe('Accordion Component', () => {
    test('renders without crashing', () => {
        render(<Accordion items={defaultItems} />);
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    test('displays content when item is clicked', () => {
        render(<Accordion items={defaultItems} />);
        const item1Trigger = screen.getByText('Item 1');
        fireEvent.click(item1Trigger);
        expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    test('hides content when item is clicked again', () => {
        const { getByText, queryByText } = render(<Accordion items={defaultItems} />);
        const item1Trigger = getByText('Item 1');
        fireEvent.click(item1Trigger);
        fireEvent.click(item1Trigger);
        expect(queryByText('Content 1')).not.toBeInTheDocument();
    });

    test('only one item content is visible at a time', () => {
        render(<Accordion items={defaultItems} />);
        const item1Trigger = screen.getByText('Item 1');
        const item2Trigger = screen.getByText('Item 2');
        fireEvent.click(item1Trigger);
        fireEvent.click(item2Trigger);
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    test('displays content when item is focused and enter is pressed', () => {
        render(<Accordion items={defaultItems} />);
        const item1Trigger = screen.getByText('Item 1');
        item1Trigger.focus();
        fireEvent.click(item1Trigger);
        expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    test('navigates to next item when down arrow is pressed', () => {
        render(<Accordion items={defaultItems} />);
        const item1Trigger = screen.getByText('Item 1');
        const item2Trigger = screen.getByText('Item 2');
        item1Trigger.focus();
        fireEvent.keyDown(item1Trigger, { key: 'ArrowDown', code: 'ArrowDown' });
        expect(item2Trigger).toHaveFocus();
    });

    test('navigates to previous item when up arrow is pressed', () => {
        render(<Accordion items={defaultItems} />);
        const item1Trigger = screen.getByText('Item 1');
        const item2Trigger = screen.getByText('Item 2');
        item2Trigger.focus();
        fireEvent.keyDown(item2Trigger, { key: 'ArrowUp', code: 'ArrowUp' });
        expect(item1Trigger).toHaveFocus();
    });

    test('passes accessibility checks', (done) => {
        const { container } = render(<Accordion items={defaultItems} />);

        axe.run(container, { runOnly: { type: 'tag', values: ['wcag21a', 'wcag21aa'] } }).then((results) => {
            expect(results.incomplete.length).toBe(0);
            expect(results.violations.length).toBe(0);
            done();
        });
    });
});
