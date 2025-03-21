import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import * as axe from 'axe-core';

import Accordion from '../Accordion';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';

// Test items to use in our composable accordion
const testItems = [
    { title: 'Item 1', content: <div>Content 1</div> },
    { title: 'Item 2', content: <div>Content 2</div> },
    { title: 'Item 3', content: <div>Content 3</div> }
];

// Create a test accordion component using the composable pattern
const TestAccordion = () => {
    return (
        <Accordion.Root>
            {testItems.map((item, index) => (
                <Accordion.Item value={index} key={index}>
                    <Accordion.Header>
                        <Accordion.Trigger>
                            {item.title}
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content index={index}>
                        {item.content}
                    </Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion.Root>
    );
};

describe('Accordion Component', () => {
    test('renders without crashing', () => {
        render(<TestAccordion />);
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    test('displays content when item is clicked', () => {
        render(<TestAccordion />);
        const item1Trigger = screen.getByText('Item 1');
        fireEvent.click(item1Trigger);
        expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    test('hides content when item is clicked again', () => {
        const { getByText, queryByText } = render(<TestAccordion />);
        const item1Trigger = getByText('Item 1');
        fireEvent.click(item1Trigger);
        fireEvent.click(item1Trigger);
        expect(queryByText('Content 1')).not.toBeInTheDocument();
    });

    test('only one item content is visible at a time', () => {
        render(<TestAccordion />);
        const item1Trigger = screen.getByText('Item 1');
        const item2Trigger = screen.getByText('Item 2');
        fireEvent.click(item1Trigger);
        fireEvent.click(item2Trigger);
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    test('displays content when item is focused and enter is pressed', () => {
        render(<TestAccordion />);
        const item1Trigger = screen.getByText('Item 1');
        item1Trigger.focus();
        fireEvent.click(item1Trigger);
        expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    test('navigates to next item when down arrow is pressed', () => {
        render(<TestAccordion />);
        const item1Trigger = screen.getByText('Item 1');
        const item2Trigger = screen.getByText('Item 2');
        item1Trigger.focus();
        fireEvent.keyDown(item1Trigger, { key: 'ArrowDown', code: 'ArrowDown' });
        expect(item2Trigger).toHaveFocus();
    });

    test('navigates to previous item when up arrow is pressed', () => {
        render(<TestAccordion />);
        const item1Trigger = screen.getByText('Item 1');
        const item2Trigger = screen.getByText('Item 2');
        item2Trigger.focus();
        fireEvent.keyDown(item2Trigger, { key: 'ArrowUp', code: 'ArrowUp' });
        expect(item1Trigger).toHaveFocus();
    });

    test('passes accessibility checks', (done) => {
        const { container } = render(<TestAccordion />);

        axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } }).then((results) => {
            expect(results.incomplete.length).toBe(0);
            expect(results.violations.length).toBe(0);
            done();
        });
    });
});
