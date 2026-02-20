import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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
