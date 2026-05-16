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
});
