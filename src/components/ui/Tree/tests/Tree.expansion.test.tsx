import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tree from '../Tree';

const src = { id: 'src', label: 'src', items: [{ id: 'index', label: 'index.ts' }] };

const Files = (props: Partial<React.ComponentProps<typeof Tree.Root>>) => (
    <Tree.Root aria-label="Files" {...props}>
        <Tree.Item item={src}>src</Tree.Item>
        <Tree.Item item={{ id: 'pkg', label: 'package.json' }}>package.json</Tree.Item>
    </Tree.Root>
);

const folder = () => screen.getByRole('treeitem', { name: 'src' });

describe('Tree expansion', () => {
    test('defaultExpanded opens items by key', () => {
        render(<Files defaultExpanded={['src']} />);
        expect(folder()).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByText('index.ts')).toBeInTheDocument();
    });

    test('controlled expanded follows the prop and reports changes', async() => {
        const user = userEvent.setup();
        const onExpandedChange = jest.fn();
        const { rerender } = render(<Files expanded={[]} onExpandedChange={onExpandedChange} />);
        await user.click(folder());
        expect(onExpandedChange).toHaveBeenLastCalledWith(['src']);
        expect(folder()).toHaveAttribute('aria-expanded', 'false');
        rerender(<Files expanded={['src']} onExpandedChange={onExpandedChange} />);
        expect(screen.getByText('index.ts')).toBeInTheDocument();
    });

    test('RTL: ArrowLeft expands, ArrowRight collapses', async() => {
        const user = userEvent.setup();
        render(<Files dir="rtl" />);
        act(() => folder().focus());
        await user.keyboard('{ArrowLeft}');
        expect(folder()).toHaveAttribute('aria-expanded', 'true');
        await user.keyboard('{ArrowRight}');
        expect(folder()).toHaveAttribute('aria-expanded', 'false');
    });

    test('LTR: ArrowRight expands, ArrowLeft collapses', async() => {
        const user = userEvent.setup();
        render(<Files />);
        act(() => folder().focus());
        await user.keyboard('{ArrowRight}');
        expect(folder()).toHaveAttribute('aria-expanded', 'true');
        await user.keyboard('{ArrowLeft}');
        expect(folder()).toHaveAttribute('aria-expanded', 'false');
    });
});
