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

    test('renders children when expanded', async () => {
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

