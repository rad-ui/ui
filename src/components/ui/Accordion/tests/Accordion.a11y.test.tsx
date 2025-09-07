import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';
import { TextEncoder } from 'util';

// Polyfill TextEncoder before requiring react-dom server utilities
(global as any).TextEncoder = TextEncoder;
const { renderToString } = require('react-dom/server');
const { hydrateRoot } = require('react-dom/client');

import Accordion from '../Accordion';
import { AccordionRootProps } from '../fragments/AccordionRoot';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';

// Basic items used in most tests
const items = [
    { title: 'Item 1', content: <div>Content 1</div> },
    { title: 'Item 2', content: <div>Content 2</div> },
    { title: 'Item 3', content: <div>Content 3</div> }
];

// Helper to render a simple accordion
const TestAccordion = (props: Partial<AccordionRootProps>) => (
    <Accordion.Root {...props}>
        {items.map((item, index) => (
            <Accordion.Item value={index} key={index} disabled={(item as any).disabled}>
                <Accordion.Header>
                    <Accordion.Trigger>{item.title}</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content index={index}>{item.content}</Accordion.Content>
            </Accordion.Item>
        ))}
    </Accordion.Root>
);

describe('Accordion accessibility', () => {
    test('Enter/Space toggles trigger and updates data-state', async () => {
        const user = userEvent.setup();
        render(<TestAccordion />);
        const trigger = screen.getByRole('button', { name: 'Item 1' });

        await user.tab();
        expect(trigger).toHaveAttribute('data-state', 'closed');

        await user.keyboard(' ');
        expect(trigger).toHaveAttribute('data-state', 'open');

        await user.keyboard(' ');
        expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    test('Arrow keys move focus between triggers', async () => {
        const user = userEvent.setup();
        render(<TestAccordion />);
        const triggers = screen.getAllByRole('button');

        await user.tab();
        await user.keyboard('{ArrowDown}');
        expect(triggers[1]).toHaveFocus();

        await user.keyboard('{ArrowUp}');
        expect(triggers[0]).toHaveFocus();
    });

    test('controlled value prop syncs with external changes', async () => {
        const user = userEvent.setup();
        const Controlled = () => {
            const [value, setValue] = React.useState<(number | string)[]>([]);
            return (
                <>
                    <button onClick={() => setValue([1])}>Open 2</button>
                    <TestAccordion value={value} onValueChange={setValue} />
                </>
            );
        };

        render(<Controlled />);

        await user.click(screen.getByText('Open 2'));
        expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    test('defaultValue opens specified item initially', () => {
        render(<TestAccordion defaultValue={[2]} />);
        expect(screen.getByText('Content 3')).toBeInTheDocument();
    });

    test('axe has no violations when closed or open', async () => {
        const user = userEvent.setup();
        const { container } = render(<TestAccordion />);

        let results = await axe.run(container, {
            runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS }
        });
        expect(results.violations.length).toBe(0);

        const triggers = screen.getAllByRole('button');
        await user.click(triggers[0]);
        await user.click(triggers[1]);

        results = await axe.run(container, {
            runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS }
        });
        expect(results.violations.length).toBe(0);
    });

    test('asChild trigger retains child semantics and forwards ref', async () => {
        const user = userEvent.setup();
        const ref = React.createRef<HTMLAnchorElement>();

        render(
            <Accordion.Root>
                <Accordion.Item value={0}>
                    <Accordion.Header>
                        {/* @ts-expect-error - testing custom child via asChild */}
                        <Accordion.Trigger asChild>
                            <a href="#" ref={ref}>Link Trigger</a>
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content index={0}>Content</Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        );

        expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
        await user.click(ref.current!);
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    test('renders and hydrates without mismatches', async () => {
        const markup = renderToString(<TestAccordion defaultValue={[0]} />);
        const container = document.createElement('div');
        container.innerHTML = markup;
        document.body.appendChild(container);

        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        let root: ReturnType<typeof hydrateRoot>;
        await act(async () => {
            root = hydrateRoot(container, <TestAccordion defaultValue={[0]} />);
        });
        act(() => root.unmount());

        expect(errorSpy).not.toHaveBeenCalled();
        errorSpy.mockRestore();
        document.body.removeChild(container);
    });

    test('supports multiple open panels and disabled triggers', async () => {
        const user = userEvent.setup();
        const disabledItems = [
            { title: 'Item 1', content: <div>Content 1</div> },
            { title: 'Item 2', content: <div>Content 2</div>, disabled: true },
            { title: 'Item 3', content: <div>Content 3</div> }
        ];

        const DisabledAccordion = (props: Partial<AccordionRootProps>) => (
            <Accordion.Root {...props}>
                {disabledItems.map((item, index) => (
                    <Accordion.Item value={index} key={index} disabled={(item as any).disabled}>
                        <Accordion.Header>
                            <Accordion.Trigger>{item.title}</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content index={index}>{item.content}</Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        );

        render(<DisabledAccordion openMultiple />);
        const triggers = screen.getAllByRole('button');

        await user.click(triggers[0]);
        await user.click(triggers[2]);
        expect(screen.getByText('Content 1')).toBeInTheDocument();
        expect(screen.getByText('Content 3')).toBeInTheDocument();

        await user.click(triggers[1]);
        expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
        expect(triggers[1]).toHaveAttribute('aria-disabled', 'true');

        act(() => {
            triggers[0].focus();
        });
        await user.keyboard('{ArrowDown}');
        expect(triggers[2]).toHaveFocus();
    });

    test('applies rtl direction attribute', () => {
        render(<TestAccordion dir="rtl" data-testid="accordion" orientation="horizontal" />);
        expect(screen.getByTestId('accordion')).toHaveAttribute('dir', 'rtl');
    });
});

