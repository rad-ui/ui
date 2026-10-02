import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Disclosure from '../Disclosure';

const items = [
    { title: 'Item 1', content: 'Content 1' },
    { title: 'Item 2', content: 'Content 2' }
];

describe('Disclosure', () => {
    test('renders Disclosure component', () => {
        render(<Disclosure items={[]} aria-label="test" />);
        expect(screen.getByTestId('disclosure-root')).toBeInTheDocument();
    });

    test('forwards refs', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const itemRef = React.createRef<HTMLDivElement>();
        const triggerRef = React.createRef<HTMLButtonElement>();
        const contentRef = React.createRef<HTMLDivElement>();

        render(
            <Disclosure.Root ref={rootRef} aria-label="test">
                <Disclosure.Item ref={itemRef} value={0}>
                    <Disclosure.Trigger ref={triggerRef}>Item</Disclosure.Trigger>
                    <Disclosure.Content ref={contentRef}>Content</Disclosure.Content>
                </Disclosure.Item>
            </Disclosure.Root>
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(itemRef.current).toBeInstanceOf(HTMLDivElement);
        expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
        expect(contentRef.current).toBeNull();
        fireEvent.click(triggerRef.current!);
        expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
    });

    test('forwards ref through main component', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Disclosure ref={ref} items={items} aria-label="test" />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    test('renders all item titles', () => {
        render(<Disclosure items={items} aria-label="test" />);
        items.forEach(item => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
        });
    });

    test('shows content when an item is clicked', () => {
        render(<Disclosure items={items} aria-label="test" />);
        fireEvent.click(screen.getByText('Item 1'));
        expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    test('reflects anatomy and open state through data attributes', () => {
        render(
            <Disclosure.Root aria-label="test" defaultOpen={0} className="custom-root">
                <Disclosure.Item value={0} data-testid="item-one">
                    <Disclosure.Trigger>Item 1</Disclosure.Trigger>
                    <Disclosure.Content>Content 1</Disclosure.Content>
                </Disclosure.Item>
                <Disclosure.Item value={1} data-testid="item-two">
                    <Disclosure.Trigger>Item 2</Disclosure.Trigger>
                    <Disclosure.Content>Content 2</Disclosure.Content>
                </Disclosure.Item>
            </Disclosure.Root>
        );

        const root = screen.getByTestId('disclosure-root');
        const openItem = screen.getByTestId('item-one');
        const closedItem = screen.getByTestId('item-two');
        const openTrigger = screen.getByText('Item 1');
        const closedTrigger = screen.getByText('Item 2');
        const content = screen.getByText('Content 1');

        expect(root).toHaveClass('custom-root');
        expect(root).toHaveAttribute('data-slot', 'disclosure-root');
        expect(openItem).toHaveAttribute('data-slot', 'disclosure-item');
        expect(openItem).toHaveAttribute('data-state', 'open');
        expect(closedItem).toHaveAttribute('data-state', 'closed');
        expect(openTrigger).toHaveAttribute('data-slot', 'disclosure-trigger');
        expect(openTrigger).toHaveAttribute('data-state', 'open');
        expect(closedTrigger).toHaveAttribute('data-state', 'closed');
        expect(content).toHaveAttribute('data-slot', 'disclosure-content');
        expect(content).toHaveAttribute('data-state', 'open');
    });

    test('loop={false} stops focus wrap between triggers', async() => {
        const user = userEvent.setup();

        render(
            <Disclosure.Root aria-label="test" loop={false}>
                <Disclosure.Item value={0}>
                    <Disclosure.Trigger>Item 1</Disclosure.Trigger>
                    <Disclosure.Content>Content 1</Disclosure.Content>
                </Disclosure.Item>
                <Disclosure.Item value={1}>
                    <Disclosure.Trigger>Item 2</Disclosure.Trigger>
                    <Disclosure.Content>Content 2</Disclosure.Content>
                </Disclosure.Item>
            </Disclosure.Root>
        );

        const item1 = screen.getByText('Item 1');
        const item2 = screen.getByText('Item 2');

        await user.tab();
        expect(item1).toHaveFocus();

        await user.keyboard('{ArrowLeft}');
        expect(item1).toHaveFocus();

        await user.keyboard('{ArrowRight}');
        expect(item2).toHaveFocus();

        await user.keyboard('{ArrowRight}');
        expect(item2).toHaveFocus();
    });

    test('hides content when the same item is clicked again', () => {
        render(<Disclosure items={items} aria-label="test" />);
        const button = screen.getByText('Item 1');
        fireEvent.click(button);
        fireEvent.click(button);
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    test('has proper accessibility attributes', () => {
        render(<Disclosure items={items} aria-label="accordion" />);
        const root = screen.getByTestId('disclosure-root');
        expect(root).toHaveAttribute('aria-label', 'accordion');
        const trigger = screen.getByText('Item 1');
        fireEvent.click(trigger);
        const content = screen.getByText('Content 1');
        expect(content).toHaveAttribute('aria-hidden', 'false');
    });

    test('renders without warnings', () => {
        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(<Disclosure items={items} aria-label="test" />);
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
    });
});
