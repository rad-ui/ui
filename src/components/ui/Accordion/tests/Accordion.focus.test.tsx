import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Accordion from '../Accordion';
import { AccordionRootProps } from '../fragments/AccordionRoot';

const testItems = [
    { title: 'First', content: <div>Content A</div> },
    { title: 'Second', content: <div>Content B</div> },
    { title: 'Third', content: <div>Content C</div> }
];

const FocusHarness = (props: Partial<AccordionRootProps>) => (
    <div>
        <button type="button">Before</button>
        <Accordion.Root collapsible {...props as AccordionRootProps}>
            {testItems.map((item, index) => (
                <Accordion.Item value={`${index}`} key={index}>
                    <Accordion.Header>
                        <Accordion.Trigger>{item.title}</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>{item.content}</Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion.Root>
        <button type="button">After</button>
    </div>
);

const DisabledFirstHarness = (props: Partial<AccordionRootProps>) => (
    <div>
        <button type="button">Before</button>
        <Accordion.Root collapsible {...props}>
            {testItems.map((item, index) => (
                <Accordion.Item value={index} key={index} disabled={index === 0}>
                    <Accordion.Header>
                        <Accordion.Trigger>{item.title}</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>{item.content}</Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion.Root>
        <button type="button">After</button>
    </div>
);

describe('Accordion focus behavior', () => {
    test('accordion triggers are keyboard focusable', () => {
        render(<FocusHarness />);
        const triggers = screen.getAllByRole('button').filter((el) =>
            ['First', 'Second', 'Third'].some((label) => el.textContent === label)
        );
        triggers.forEach((trigger) => {
            expect(trigger).toHaveAttribute('tabindex', '0');
        });
    });

    test('Tab moves from Before through accordion triggers, then to After', async() => {
        const user = userEvent.setup();
        render(<FocusHarness />);
        const before = screen.getByRole('button', { name: 'Before' });
        const first = screen.getByRole('button', { name: 'First' });
        const second = screen.getByRole('button', { name: 'Second' });
        const third = screen.getByRole('button', { name: 'Third' });
        const after = screen.getByRole('button', { name: 'After' });

        before.focus();
        expect(before).toHaveFocus();

        await user.tab();
        expect(first).toHaveFocus();

        await user.tab();
        expect(second).toHaveFocus();

        await user.tab();
        expect(third).toHaveFocus();

        await user.tab();
        expect(after).toHaveFocus();
    });

    test('Shift+Tab from first in-group focus returns to Before', async() => {
        const user = userEvent.setup();
        render(<FocusHarness />);
        const before = screen.getByRole('button', { name: 'Before' });
        const first = screen.getByRole('button', { name: 'First' });

        first.focus();
        expect(first).toHaveFocus();

        await user.tab({ shift: true });
        expect(before).toHaveFocus();
    });

    test('ArrowDown moves focus and updates roving tabIndex', async() => {
        const user = userEvent.setup();
        render(<FocusHarness />);
        const triggers = [
            screen.getByRole('button', { name: 'First' }),
            screen.getByRole('button', { name: 'Second' }),
            screen.getByRole('button', { name: 'Third' })
        ];

        triggers[0].focus();
        await user.keyboard('{ArrowDown}');
        expect(triggers[1]).toHaveFocus();
    });

    test('horizontal orientation uses ArrowRight/Left between triggers', async() => {
        const user = userEvent.setup();
        render(<FocusHarness orientation="horizontal" />);
        const first = screen.getByRole('button', { name: 'First' });
        const second = screen.getByRole('button', { name: 'Second' });

        first.focus();
        await user.keyboard('{ArrowRight}');
        expect(second).toHaveFocus();
        await user.keyboard('{ArrowLeft}');
        expect(first).toHaveFocus();
    });

    test('disableTabIndexing gives every trigger tabIndex 0', () => {
        render(<FocusHarness disableTabIndexing />);
        const triggers = [
            screen.getByRole('button', { name: 'First' }),
            screen.getByRole('button', { name: 'Second' }),
            screen.getByRole('button', { name: 'Third' })
        ];
        triggers.forEach((t) => {
            expect(t).toHaveAttribute('tabindex', '0');
        });
    });

    test('disabled first trigger does not consume the roving tabindex entry point', () => {
        render(<DisabledFirstHarness />);
        const first = screen.getByRole('button', { name: 'First' });
        const second = screen.getByRole('button', { name: 'Second' });
        const third = screen.getByRole('button', { name: 'Third' });

        expect(first).toHaveAttribute('tabindex', '-1');
        expect(second).toHaveAttribute('tabindex', '0');
        expect(third).toHaveAttribute('tabindex', '-1');
    });

    test('Tab enters the first enabled trigger when the first item is disabled', async() => {
        const user = userEvent.setup();
        render(<DisabledFirstHarness />);
        const before = screen.getByRole('button', { name: 'Before' });
        const second = screen.getByRole('button', { name: 'Second' });

        before.focus();
        expect(before).toHaveFocus();

        await user.tab();
        expect(second).toHaveFocus();
    });
});
