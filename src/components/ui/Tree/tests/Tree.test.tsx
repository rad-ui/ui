import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tree from '../Tree';

describe('Tree', () => {
    test('forwards ref to root element', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <Tree.Root ref={ref} aria-label='Files'>
                <Tree.Item item={{ label: 'Item' }}>Item</Tree.Item>
            </Tree.Root>
        );
        expect(ref.current).not.toBeNull();
        expect(ref.current?.tagName).toBe('DIV');
    });

    test('forwards ref to item element', () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(
            <Tree.Root aria-label='Files'>
                <Tree.Item ref={ref} item={{ label: 'Item' }}>Item</Tree.Item>
            </Tree.Root>
        );
        expect(ref.current).not.toBeNull();
        expect(ref.current?.tagName).toBe('BUTTON');
    });

    test('applies aria-label for accessibility', () => {
        render(
            <Tree.Root aria-label='File explorer'>
                <Tree.Item item={{ label: 'Item' }}>Item</Tree.Item>
            </Tree.Root>
        );
        expect(screen.getByRole('tree')).toHaveAttribute('aria-label', 'File explorer');
    });

    test('renders children when expanded', async() => {
        const user = userEvent.setup();
        const item = { label: 'Parent', items: [{ label: 'Child', items: [] }] };
        render(
            <Tree.Root aria-label='Files'>
                <Tree.Item item={item}>{item.label}</Tree.Item>
            </Tree.Root>
        );
        expect(screen.queryByText('Child')).toBeNull();
        await user.click(screen.getByText('Parent'));
        expect(screen.getByText('Child')).toBeInTheDocument();
    });

    test('loop={false} stops arrow navigation at tree edges', async() => {
        const user = userEvent.setup();

        render(
            <Tree.Root aria-label='Files' loop={false}>
                <Tree.Item item={{ label: 'Item 1' }}>Item 1</Tree.Item>
                <Tree.Item item={{ label: 'Item 2' }}>Item 2</Tree.Item>
                <Tree.Item item={{ label: 'Item 3' }}>Item 3</Tree.Item>
            </Tree.Root>
        );

        const item1 = screen.getByRole('treeitem', { name: 'Item 1' });
        const item3 = screen.getByRole('treeitem', { name: 'Item 3' });

        await user.tab();
        expect(item1).toHaveFocus();

        await user.keyboard('{ArrowUp}');
        expect(item1).toHaveFocus();

        await user.keyboard('{ArrowDown}{ArrowDown}');
        expect(item3).toHaveFocus();

        await user.keyboard('{ArrowDown}');
        expect(item3).toHaveFocus();
    });

    test('ArrowRight expands parent items and moves focus into expanded branches', async() => {
        const user = userEvent.setup();
        const item = { label: 'Parent', items: [{ label: 'Child', items: [] }] };

        render(
            <Tree.Root aria-label='Files'>
                <Tree.Item item={item}>{item.label}</Tree.Item>
            </Tree.Root>
        );

        const parent = screen.getByRole('treeitem', { name: 'Parent' });

        await user.tab();
        expect(parent).toHaveFocus();
        expect(parent).toHaveAttribute('aria-expanded', 'false');
        expect(screen.queryByRole('treeitem', { name: 'Child' })).toBeNull();

        await user.keyboard('{ArrowRight}');
        expect(parent).toHaveAttribute('aria-expanded', 'true');
        expect(parent).toHaveFocus();

        const child = screen.getByRole('treeitem', { name: 'Child' });
        await user.keyboard('{ArrowRight}');
        expect(child).toHaveFocus();
    });

    test('ArrowLeft collapses expanded items and moves child focus back to the parent', async() => {
        const user = userEvent.setup();
        const item = { label: 'Parent', expanded: true, items: [{ label: 'Child', items: [] }] };

        render(
            <Tree.Root aria-label='Files'>
                <Tree.Item item={item}>{item.label}</Tree.Item>
            </Tree.Root>
        );

        const parent = screen.getByRole('treeitem', { name: 'Parent' });
        const child = screen.getByRole('treeitem', { name: 'Child' });

        await user.tab();
        expect(parent).toHaveFocus();

        await user.keyboard('{ArrowRight}');
        expect(child).toHaveFocus();

        await user.keyboard('{ArrowLeft}');
        expect(parent).toHaveFocus();

        await user.keyboard('{ArrowLeft}');
        expect(parent).toHaveAttribute('aria-expanded', 'false');
        expect(screen.queryByRole('treeitem', { name: 'Child' })).toBeNull();
    });

    test('Enter delegates selection without expanding the focused item', async() => {
        const user = userEvent.setup();
        const onToggleSelect = jest.fn();
        const item = { label: 'Parent', items: [{ label: 'Child', items: [] }] };

        render(
            <Tree.Root aria-label='Files'>
                <Tree.Item item={item} onToggleSelect={onToggleSelect}>{item.label}</Tree.Item>
            </Tree.Root>
        );

        const parent = screen.getByRole('treeitem', { name: 'Parent' });

        await user.tab();
        await user.keyboard('{Enter}');

        expect(onToggleSelect).toHaveBeenCalledTimes(1);
        expect(onToggleSelect).toHaveBeenCalledWith(expect.any(String), item);
        expect(parent).toHaveAttribute('aria-expanded', 'false');
        expect(screen.queryByRole('treeitem', { name: 'Child' })).toBeNull();
    });

    test('renders without console errors or warnings', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
        const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        render(
            <Tree.Root aria-label='Files'>
                <Tree.Item item={{ label: 'Item' }}>Item</Tree.Item>
            </Tree.Root>
        );
        expect(consoleError).not.toHaveBeenCalled();
        expect(consoleWarn).not.toHaveBeenCalled();
        consoleError.mockRestore();
        consoleWarn.mockRestore();
    });

    test('exposes aria-level, aria-posinset and aria-setsize on nested items', () => {
        const item = { label: 'Parent', expanded: true, items: [{ label: 'A' }, { label: 'B' }] };
        render(
            <Tree.Root aria-label='Files'>
                <Tree.Item item={item}>{item.label}</Tree.Item>
            </Tree.Root>
        );
        expect(screen.getByRole('treeitem', { name: 'Parent' })).toHaveAttribute('aria-level', '1');
        const b = screen.getByRole('treeitem', { name: 'B' });
        expect(b).toHaveAttribute('aria-level', '2');
        expect(b).toHaveAttribute('aria-posinset', '2');
        expect(b).toHaveAttribute('aria-setsize', '2');
    });

    test('does not render an empty group for an expanded item without children', () => {
        render(
            <Tree.Root aria-label='Files'>
                <Tree.Item item={{ label: 'Leaf', expanded: true, items: [] }}>Leaf</Tree.Item>
            </Tree.Root>
        );
        expect(screen.queryByRole('group')).toBeNull();
    });

    test('renders sibling children with duplicate labels without key warnings', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
        const item = { label: 'Parent', expanded: true, items: [{ label: 'index.ts' }, { label: 'index.ts' }] };
        render(
            <Tree.Root aria-label='Files'>
                <Tree.Item item={item}>{item.label}</Tree.Item>
            </Tree.Root>
        );
        expect(screen.getAllByRole('treeitem', { name: 'index.ts' })).toHaveLength(2);
        expect(consoleError).not.toHaveBeenCalled();
        consoleError.mockRestore();
    });

    test('typeahead moves focus to the next visible item starting with the typed character', async() => {
        const user = userEvent.setup();
        const item = { label: 'src', expanded: true, items: [{ label: 'components' }, { label: 'utils' }] };
        render(
            <Tree.Root aria-label='Files'>
                <Tree.Item item={item}>{item.label}</Tree.Item>
                <Tree.Item item={{ label: 'package.json' }}>package.json</Tree.Item>
                <Tree.Item item={{ label: 'scripts' }}>scripts</Tree.Item>
            </Tree.Root>
        );

        await user.tab();
        expect(screen.getByRole('treeitem', { name: 'src' })).toHaveFocus();

        await user.keyboard('u');
        expect(screen.getByRole('treeitem', { name: 'utils' })).toHaveFocus();

        await user.keyboard('S');
        expect(screen.getByRole('treeitem', { name: 'scripts' })).toHaveFocus();

        // wraps around to the first match
        await user.keyboard('s');
        expect(screen.getByRole('treeitem', { name: 'src' })).toHaveFocus();

        // no match leaves focus unchanged
        await user.keyboard('z');
        expect(screen.getByRole('treeitem', { name: 'src' })).toHaveFocus();

        // ArrowDown continues from the typeahead target (roving state stays in sync)
        await user.keyboard('{ArrowDown}');
        expect(screen.getByRole('treeitem', { name: 'components' })).toHaveFocus();
    });
});
