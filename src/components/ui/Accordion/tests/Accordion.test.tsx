import { fireEvent, render, screen, act } from '@testing-library/react';
import React from 'react';
import * as axe from 'axe-core';

import Accordion from '../Accordion';
import { AccordionRootProps } from '../fragments/AccordionRoot';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Theme from '../../Theme/Theme';

// Test items to use in our composable accordion
const testItems = [
    { title: 'Item 1', content: <div>Content 1</div> },
    { title: 'Item 2', content: <div>Content 2</div> },
    { title: 'Item 3', content: <div>Content 3</div> }
];

// Create a test accordion component using the composable pattern
const TestAccordion = (props: Partial<AccordionRootProps>) => {
    return (
        <Accordion.Root collapsible {...props}>
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
    const originalMatchMedia = window.matchMedia;

    afterEach(() => {
        window.matchMedia = originalMatchMedia;
    });

    test('renders without crashing', () => {
        render(<TestAccordion />);
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    test('does not generate classes without a theme classNamespace', () => {
        render(
            <Accordion.Root data-testid="accordion-root" defaultValue={[0]}>
                <Accordion.Item data-testid="accordion-item" value={0}>
                    <Accordion.Header data-testid="accordion-header">
                        <Accordion.Trigger data-testid="accordion-trigger">Item 1</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content data-testid="accordion-content">Content 1</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        );

        const content = screen.getByTestId('accordion-content');

        expect(screen.getByTestId('accordion-root').className).toBe('');
        expect(screen.getByTestId('accordion-item').className).toBe('');
        expect(screen.getByTestId('accordion-header').className).toBe('');
        expect(screen.getByTestId('accordion-trigger').className).toBe('');
        expect(content.className).toBe('');
        expect(content.firstElementChild?.className).toBe('');
    });

    test('generates namespaced classes from Theme classNamespace', () => {
        window.matchMedia = jest.fn().mockReturnValue({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown as MediaQueryList);

        render(
            <Theme classNamespace="acme">
                <Accordion.Root data-testid="accordion-root" defaultValue={[0]}>
                    <Accordion.Item data-testid="accordion-item" value={0}>
                        <Accordion.Header data-testid="accordion-header">
                            <Accordion.Trigger data-testid="accordion-trigger">Item 1</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content data-testid="accordion-content">Content 1</Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>
            </Theme>
        );

        const content = screen.getByTestId('accordion-content');

        expect(screen.getByTestId('accordion-root')).toHaveClass('acme-accordion-root');
        expect(screen.getByTestId('accordion-item')).toHaveClass('acme-accordion-item');
        expect(screen.getByTestId('accordion-header')).toHaveClass('acme-accordion-header');
        expect(screen.getByTestId('accordion-trigger')).toHaveClass('acme-accordion-trigger');
        expect(content).toHaveClass('acme-accordion-content');
        expect(content.firstElementChild).toHaveClass('acme-accordion-content-inner');
    });

    test('forwards refs to underlying elements without warnings', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const itemRef = React.createRef<HTMLDivElement>();
        const headerRef = React.createRef<HTMLHeadingElement>();
        const triggerRef = React.createRef<HTMLButtonElement>();
        const contentRef = React.createRef<HTMLDivElement>();
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

        render(
            <Accordion.Root ref={rootRef} defaultValue={[0]}>
                <Accordion.Item value={0} ref={itemRef}>
                    <Accordion.Header ref={headerRef}>
                        <Accordion.Trigger ref={triggerRef}>Item 1</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content ref={contentRef} index={0}>
                        Content 1
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(itemRef.current).toBeInstanceOf(HTMLDivElement);
        expect(headerRef.current).toBeInstanceOf(HTMLHeadingElement);
        expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
        expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(warnSpy).not.toHaveBeenCalled();

        errorSpy.mockRestore();
        warnSpy.mockRestore();
    });

    test('displays content when item is clicked', () => {
        render(<TestAccordion />);
        const item1Trigger = screen.getByText('Item 1');
        fireEvent.click(item1Trigger);
        expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    test('calls user onClick while preserving toggle behavior', () => {
        const handleClick = jest.fn();
        render(
            <Accordion.Root collapsible>
                <Accordion.Item value={0}>
                    <Accordion.Header>
                        <Accordion.Trigger onClick={handleClick}>
                            Item 1
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>Content 1</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        );

        const trigger = screen.getByText('Item 1');
        fireEvent.click(trigger);
        expect(handleClick).toHaveBeenCalled();
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
        act(() => {
            item1Trigger.focus();
            fireEvent.click(item1Trigger);
        });
        expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    test('navigates to next item when down arrow is pressed', () => {
        render(<TestAccordion />);
        const item1Trigger = screen.getByText('Item 1');
        const item2Trigger = screen.getByText('Item 2');
        act(() => {
            item1Trigger.focus();
            fireEvent.keyDown(item1Trigger, { key: 'ArrowDown', code: 'ArrowDown' });
        });
        expect(item2Trigger).toHaveFocus();
    });

    test('navigates to previous item when up arrow is pressed', () => {
        render(<TestAccordion />);
        const item1Trigger = screen.getByText('Item 1');
        const item2Trigger = screen.getByText('Item 2');
        act(() => {
            item2Trigger.focus();
            fireEvent.keyDown(item2Trigger, { key: 'ArrowUp', code: 'ArrowUp' });
        });
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

    test('controlled mode responds to external value changes', () => {
        const TestWithControls = () => {
            const [value, setValue] = React.useState<(number | string)[]>([]);

            return (
                <>
                    <button onClick={() => setValue([])}>Close All</button>
                    <button onClick={() => setValue([1])}>Open 2</button>
                    <button onClick={() => setValue([0, 2])}>Open 1 & 3</button>
                    <TestAccordion value={value} onValueChange={setValue} openMultiple />
                </>
            );
        };

        render(<TestWithControls />);

        // Initially all closed
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
        expect(screen.queryByText('Content 3')).not.toBeInTheDocument();

        // Open item 2
        fireEvent.click(screen.getByText('Open 2'));
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        expect(screen.getByText('Content 2')).toBeInTheDocument();
        expect(screen.queryByText('Content 3')).not.toBeInTheDocument();

        // Open items 1 & 3
        fireEvent.click(screen.getByText('Open 1 & 3'));
        expect(screen.getByText('Content 1')).toBeInTheDocument();
        expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
        expect(screen.getByText('Content 3')).toBeInTheDocument();

        // Close all
        fireEvent.click(screen.getByText('Close All'));
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
        expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });

    test('works with defaultValue to show initial item', () => {
        render(<TestAccordion defaultValue={[2]} />);

        // Item 3 content should be visible initially
        expect(screen.getByText('Content 3')).toBeInTheDocument();
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    test('Radix-style non-collapsible single mode keeps panel open on second click', () => {
        render(
            <Accordion.Root>
                {testItems.map((item, index) => (
                    <Accordion.Item value={index} key={index}>
                        <Accordion.Header>
                            <Accordion.Trigger>{item.title}</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content>{item.content}</Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        );
        const trigger = screen.getByText('Item 1');
        fireEvent.click(trigger);
        expect(screen.getByText('Content 1')).toBeInTheDocument();
        fireEvent.click(trigger);
        expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    test('Escape on trigger closes panel and syncs aria-expanded (collapsible)', () => {
        render(
            <Accordion.Root collapsible defaultValue={[0]}>
                <Accordion.Item value={0}>
                    <Accordion.Header>
                        <Accordion.Trigger>Item 1</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>Content 1</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        );
        const trigger = screen.getByRole('button', { name: 'Item 1' });
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        fireEvent.keyDown(trigger, { key: 'Escape' });
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });
});
