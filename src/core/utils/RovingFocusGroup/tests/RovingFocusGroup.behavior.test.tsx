import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';

import RovingFocusGroup from '../index';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';

describe('RovingFocusGroup behavior', () => {
    test('arrow keys move focus and Tab leaves group', async () => {
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

    test('wraps focus when reaching ends', async () => {
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

    test('skips disabled items during navigation', async () => {
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

    test('respects RTL direction for horizontal navigation', async () => {
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

    test('supports dynamic item add and remove', async () => {
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
        expect(itemA).toHaveFocus();

        await user.click(addBtn);
        const item3 = screen.getByText('Item3');
        await user.keyboard('{ArrowRight}');
        await user.keyboard('{ArrowRight}');
        expect(item3).toHaveFocus();

        await user.click(removeBtn);
        const itemB = screen.getByText('B');
        itemB.focus();
        await user.keyboard('{ArrowRight}');
        expect(itemA).toHaveFocus();
    });

    test('handles multiple groups independently', async () => {
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
});
