import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';

import RovingFocusGroup from '../index';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';

describe('RovingFocusGroup behavior', () => {
    test('arrow keys move focus and Tab leaves group', async() => {
        const user = userEvent.setup();
        render(
            <>
                <RovingFocusGroup.Root orientation="horizontal">
                    <RovingFocusGroup.Group>
                        <RovingFocusGroup.Item><button>Item 1</button></RovingFocusGroup.Item>
                        <RovingFocusGroup.Item><button>Item 2</button></RovingFocusGroup.Item>
                        <RovingFocusGroup.Item><button>Item 3</button></RovingFocusGroup.Item>
                    </RovingFocusGroup.Group>
                </RovingFocusGroup.Root>
                <button data-testid="outside">Outside</button>
            </>
        );
        const item1 = screen.getByText('Item 1');
        const item2 = screen.getByText('Item 2');
        const outside = screen.getByTestId('outside');

        await user.tab();
        expect(item1).toHaveFocus();

        await user.keyboard('{ArrowRight}');
        expect(item2).toHaveFocus();

        await user.tab();
        expect(outside).toHaveFocus();
    });

    test('wraps focus when reaching ends', async() => {
        const user = userEvent.setup();
        render(
            <RovingFocusGroup.Root orientation="horizontal" loop>
                <RovingFocusGroup.Group>
                    <RovingFocusGroup.Item><button>Item 1</button></RovingFocusGroup.Item>
                    <RovingFocusGroup.Item><button>Item 2</button></RovingFocusGroup.Item>
                    <RovingFocusGroup.Item><button>Item 3</button></RovingFocusGroup.Item>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        );
        const item1 = screen.getByText('Item 1');
        const item3 = screen.getByText('Item 3');

        await user.tab();
        expect(item1).toHaveFocus();

        await user.keyboard('{ArrowLeft}');
        expect(item3).toHaveFocus();

        await user.keyboard('{ArrowRight}');
        expect(item1).toHaveFocus();
    });

    test('skips disabled items during navigation', async() => {
        const user = userEvent.setup();
        render(
            <RovingFocusGroup.Root orientation="horizontal" loop>
                <RovingFocusGroup.Group>
                    <RovingFocusGroup.Item><button>Item 1</button></RovingFocusGroup.Item>
                    <RovingFocusGroup.Item><button disabled>Item 2</button></RovingFocusGroup.Item>
                    <RovingFocusGroup.Item><button>Item 3</button></RovingFocusGroup.Item>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        );
        const item1 = screen.getByText('Item 1');
        const item3 = screen.getByText('Item 3');

        await user.tab();
        expect(item1).toHaveFocus();

        await user.keyboard('{ArrowRight}');
        expect(item3).toHaveFocus();

        await user.keyboard('{ArrowLeft}');
        expect(item1).toHaveFocus();
    });

    test('respects RTL direction for horizontal navigation', async() => {
        const user = userEvent.setup();
        render(
            <RovingFocusGroup.Root orientation="horizontal" dir="rtl">
                <RovingFocusGroup.Group>
                    <RovingFocusGroup.Item><button>Item 1</button></RovingFocusGroup.Item>
                    <RovingFocusGroup.Item><button>Item 2</button></RovingFocusGroup.Item>
                    <RovingFocusGroup.Item><button>Item 3</button></RovingFocusGroup.Item>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        );
        const item1 = screen.getByText('Item 1');
        const item2 = screen.getByText('Item 2');

        await user.tab();
        expect(item1).toHaveFocus();

        await user.keyboard('{ArrowLeft}');
        expect(item2).toHaveFocus();

        await user.keyboard('{ArrowRight}');
        expect(item1).toHaveFocus();
    });

    test('supports dynamic item add and remove', async() => {
        const user = userEvent.setup();
        const DynamicGroup = () => {
            const [items, setItems] = React.useState(['A', 'B']);
            return (
                <>
                    <button onClick={() => setItems([...items, `Item${items.length + 1}`])} data-testid="add">Add</button>
                    <button onClick={() => setItems(items.slice(0, -1))} data-testid="remove">Remove</button>
                    <RovingFocusGroup.Root orientation="horizontal" loop mode="tree">
                        <RovingFocusGroup.Group>
                            {items.map((label) => (
                                <RovingFocusGroup.Item key={label}>
                                    <button>{label}</button>
                                </RovingFocusGroup.Item>
                            ))}
                        </RovingFocusGroup.Group>
                    </RovingFocusGroup.Root>
                </>
            );
        };
        render(<DynamicGroup />);

        const itemA = screen.getByText('A');
        const addBtn = screen.getByTestId('add');
        const removeBtn = screen.getByTestId('remove');

        await user.tab();
        await user.tab();
        await user.tab();
        expect(itemA).toHaveFocus();

        await user.click(addBtn);
        const item3 = screen.getByText('Item3');
        itemA.focus();
        await user.keyboard('{ArrowRight}');
        await user.keyboard('{ArrowRight}');
        expect(item3).toHaveFocus();

        await user.click(removeBtn);
        const itemB = screen.getByText('B');
        itemB.focus();
        await user.keyboard('{ArrowRight}');
        expect(itemA).toHaveFocus();
    });

    test('supports dynamic item add and remove in default mode', async() => {
        const user = userEvent.setup();
        const DynamicGroup = () => {
            const [items, setItems] = React.useState(['A', 'B']);
            return (
                <>
                    <button onClick={() => setItems([...items, `Item${items.length + 1}`])} data-testid="add">Add</button>
                    <button onClick={() => setItems(items.slice(0, -1))} data-testid="remove">Remove</button>
                    <RovingFocusGroup.Root orientation="horizontal" loop>
                        <RovingFocusGroup.Group>
                            {items.map((label) => (
                                <RovingFocusGroup.Item key={label}>
                                    <button>{label}</button>
                                </RovingFocusGroup.Item>
                            ))}
                        </RovingFocusGroup.Group>
                    </RovingFocusGroup.Root>
                </>
            );
        };
        render(<DynamicGroup />);

        const itemA = screen.getByText('A');
        const addBtn = screen.getByTestId('add');
        const removeBtn = screen.getByTestId('remove');

        await user.tab();
        await user.tab();
        await user.tab();
        expect(itemA).toHaveFocus();

        await user.click(addBtn);
        const item3 = screen.getByText('Item3');
        itemA.focus();
        await user.keyboard('{ArrowRight}');
        await user.keyboard('{ArrowRight}');
        expect(item3).toHaveFocus();

        await user.click(removeBtn);
        const itemB = screen.getByText('B');
        itemB.focus();
        await user.keyboard('{ArrowRight}');
        expect(itemA).toHaveFocus();
    });

    test('handles multiple groups independently', async() => {
        const user = userEvent.setup();
        render(
            <RovingFocusGroup.Root orientation="horizontal">
                <RovingFocusGroup.Group>
                    <RovingFocusGroup.Item><button>G1-1</button></RovingFocusGroup.Item>
                    <RovingFocusGroup.Item><button>G1-2</button></RovingFocusGroup.Item>
                </RovingFocusGroup.Group>
                <RovingFocusGroup.Group>
                    <RovingFocusGroup.Item><button>G2-1</button></RovingFocusGroup.Item>
                    <RovingFocusGroup.Item><button>G2-2</button></RovingFocusGroup.Item>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        );
        const g1Item1 = screen.getByText('G1-1');
        const g1Item2 = screen.getByText('G1-2');
        const g2Item1 = screen.getByText('G2-1');

        await user.tab();
        expect(g1Item1).toHaveFocus();

        await user.keyboard('{ArrowRight}');
        expect(g1Item2).toHaveFocus();

        await user.keyboard('{ArrowRight}');
        expect(g1Item1).toHaveFocus();

        await user.tab();
        expect(g2Item1).toHaveFocus();
    });

    test('has no accessibility violations', (done) => {
        const { container } = render(
            <RovingFocusGroup.Root orientation="horizontal">
                <RovingFocusGroup.Group>
                    <RovingFocusGroup.Item><button>Item 1</button></RovingFocusGroup.Item>
                    <RovingFocusGroup.Item><button>Item 2</button></RovingFocusGroup.Item>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        );

        axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } }).then((results) => {
            expect(results.incomplete.length).toBe(0);
            expect(results.violations.length).toBe(0);
            done();
        });
    });
    test('Group with multiple children renders a wrapper div without asChild warnings', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        render(
            <RovingFocusGroup.Root>
                <RovingFocusGroup.Group data-testid="group" aria-label="Choices">
                    <RovingFocusGroup.Item><button>Item 1</button></RovingFocusGroup.Item>
                    <RovingFocusGroup.Item><button>Item 2</button></RovingFocusGroup.Item>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        );

        const group = screen.getByTestId('group');
        expect(group.tagName).toBe('DIV');
        expect(group).toHaveAttribute('role', 'group');
        expect(group).toHaveAttribute('aria-label', 'Choices');
        expect(group).toContainElement(screen.getByText('Item 1'));
        expect(group).toContainElement(screen.getByText('Item 2'));
        expect(warnSpy).not.toHaveBeenCalled();
        warnSpy.mockRestore();
    });

    test('Group with a single element child slots onto it', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        render(
            <RovingFocusGroup.Root>
                <RovingFocusGroup.Group aria-label="Choices">
                    <ul data-testid="list">
                        <li><RovingFocusGroup.Item><button>Item 1</button></RovingFocusGroup.Item></li>
                    </ul>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        );

        const list = screen.getByTestId('list');
        expect(list).toHaveAttribute('role', 'group');
        expect(list).toHaveAttribute('aria-label', 'Choices');
        expect(list.parentElement?.getAttribute('role')).not.toBe('group');
        expect(warnSpy).not.toHaveBeenCalled();
        warnSpy.mockRestore();
    });

    test('Group respects an explicit asChild={false} with a single child', () => {
        render(
            <RovingFocusGroup.Root>
                <RovingFocusGroup.Group asChild={false} data-testid="group">
                    <ul data-testid="list" />
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        );

        expect(screen.getByTestId('group').tagName).toBe('DIV');
        expect(screen.getByTestId('list')).not.toHaveAttribute('role');
    });

    test('Item with a link child keeps link semantics', () => {
        render(
            <RovingFocusGroup.Root>
                <RovingFocusGroup.Group>
                    <RovingFocusGroup.Item><a href="/docs">Docs</a></RovingFocusGroup.Item>
                    <RovingFocusGroup.Item><button>Action</button></RovingFocusGroup.Item>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        );

        const link = screen.getByText('Docs');
        expect(link).not.toHaveAttribute('role');
        expect(link).not.toHaveAttribute('type');
        expect(screen.getByText('Action')).toHaveAttribute('role', 'button');
        expect(screen.getByText('Action')).toHaveAttribute('type', 'button');
    });

    test('items never expose roving focus state as aria-selected', async() => {
        const user = userEvent.setup();
        render(
            <RovingFocusGroup.Root orientation="horizontal">
                <RovingFocusGroup.Group>
                    <RovingFocusGroup.Item><button>One</button></RovingFocusGroup.Item>
                    <RovingFocusGroup.Item><button>Two</button></RovingFocusGroup.Item>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        );
        await user.tab();
        await user.keyboard('{ArrowRight}');
        expect(screen.getByText('Two')).toHaveFocus();
        expect(screen.getByText('One')).not.toHaveAttribute('aria-selected');
        expect(screen.getByText('Two')).not.toHaveAttribute('aria-selected');
    });

    test('an explicit aria-selected from the consumer is preserved', () => {
        render(
            <RovingFocusGroup.Root>
                <RovingFocusGroup.Group>
                    <RovingFocusGroup.Item role="tab" aria-selected={true}><button>Tab</button></RovingFocusGroup.Item>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        );
        expect(screen.getByText('Tab')).toHaveAttribute('aria-selected', 'true');
    });

    test('root omits aria-orientation on a role-less wrapper', () => {
        const { container } = render(
            <RovingFocusGroup.Root orientation="vertical" data-testid="root">
                <RovingFocusGroup.Group>
                    <RovingFocusGroup.Item><button>A</button></RovingFocusGroup.Item>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        );
        expect(screen.getByTestId('root')).not.toHaveAttribute('aria-orientation');
        expect(container.querySelector('[aria-orientation]')).toBeNull();
    });

    test('root keeps aria-orientation when its role (own or slotted via asChild) supports it', () => {
        render(
            <>
                <RovingFocusGroup.Root orientation="vertical" role="toolbar" data-testid="toolbar">
                    <RovingFocusGroup.Group>
                        <RovingFocusGroup.Item><button>A</button></RovingFocusGroup.Item>
                    </RovingFocusGroup.Group>
                </RovingFocusGroup.Root>
                <RovingFocusGroup.Root orientation="horizontal" asChild>
                    <div role="radiogroup" aria-label="Choices" data-testid="radiogroup">
                        <RovingFocusGroup.Group>
                            <RovingFocusGroup.Item role="radio" aria-checked={false}><button>B</button></RovingFocusGroup.Item>
                        </RovingFocusGroup.Group>
                    </div>
                </RovingFocusGroup.Root>
                <RovingFocusGroup.Root orientation="both" role="toolbar" data-testid="both">
                    <RovingFocusGroup.Group>
                        <RovingFocusGroup.Item><button>C</button></RovingFocusGroup.Item>
                    </RovingFocusGroup.Group>
                </RovingFocusGroup.Root>
            </>
        );
        expect(screen.getByTestId('toolbar')).toHaveAttribute('aria-orientation', 'vertical');
        expect(screen.getByTestId('radiogroup')).toHaveAttribute('aria-orientation', 'horizontal');
        expect(screen.getByTestId('both')).not.toHaveAttribute('aria-orientation');
    });

    test('axe: a default roving group has no aria-allowed-attr violations', async() => {
        const { container } = render(
            <RovingFocusGroup.Root orientation="horizontal">
                <RovingFocusGroup.Group>
                    <RovingFocusGroup.Item><button>One</button></RovingFocusGroup.Item>
                    <RovingFocusGroup.Item><button>Two</button></RovingFocusGroup.Item>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        );
        const results = await axe.run(container, { runOnly: { type: 'rule', values: ['aria-allowed-attr'] } });
        expect(results.violations).toHaveLength(0);
    });
});
