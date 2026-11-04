import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Drawer from '../Drawer';

const App = ({ open, secondOpen = false }: { open: boolean; secondOpen?: boolean }) => (
    <Drawer.Provider>
        <Drawer.IndentBackground data-testid="bg" />
        <Drawer.Indent data-testid="indent">
            <Drawer.Root open={open} onOpenChange={() => {}}>
                <Drawer.Trigger>Open</Drawer.Trigger>
                <Drawer.Portal><Drawer.Content>One</Drawer.Content></Drawer.Portal>
            </Drawer.Root>
            <Drawer.Root open={secondOpen} onOpenChange={() => {}}>
                <Drawer.Trigger>Open two</Drawer.Trigger>
                <Drawer.Portal><Drawer.Content>Two</Drawer.Content></Drawer.Portal>
            </Drawer.Root>
        </Drawer.Indent>
    </Drawer.Provider>
);

describe('Drawer.Provider and Indent', () => {
    test('Indent and IndentBackground are active while any drawer is open', () => {
        const { rerender } = render(<App open={false} />);
        expect(screen.getByTestId('indent')).not.toHaveAttribute('data-active');
        rerender(<App open />);
        expect(screen.getByTestId('indent')).toHaveAttribute('data-active');
        expect(screen.getByTestId('bg')).toHaveAttribute('data-active');
        rerender(<App open secondOpen />);
        rerender(<App open={false} secondOpen />);
        expect(screen.getByTestId('indent')).toHaveAttribute('data-active');
        act(() => { rerender(<App open={false} />); });
        expect(screen.getByTestId('indent')).not.toHaveAttribute('data-active');
    });

    test('without a Provider, Indent is never active and nothing breaks', () => {
        render(<><Drawer.Indent data-testid="indent" /><Drawer.Root open onOpenChange={() => {}}><Drawer.Portal><Drawer.Content>One</Drawer.Content></Drawer.Portal></Drawer.Root></>);
        expect(screen.getByTestId('indent')).not.toHaveAttribute('data-active');
    });
});
