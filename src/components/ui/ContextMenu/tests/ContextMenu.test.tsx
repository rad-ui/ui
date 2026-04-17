import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ContextMenu from '../ContextMenu';

describe('ContextMenu', () => {
    test('forwards refs to underlying elements', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const triggerRef = React.createRef<HTMLSpanElement>();
        const contentRef = React.createRef<HTMLDivElement>();
        const itemRef = React.createRef<HTMLButtonElement>();

        render(
            <ContextMenu.Root ref={rootRef} defaultOpen>
                <ContextMenu.Trigger ref={triggerRef}>Open</ContextMenu.Trigger>
                <ContextMenu.Content ref={contentRef}>
                    <ContextMenu.Item ref={itemRef}>Item 1</ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Root>
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(triggerRef.current).toBeInstanceOf(HTMLSpanElement);
        expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
        expect(itemRef.current).toBeInstanceOf(HTMLButtonElement);
    });

    test('renders without console warnings', () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

        render(
            <ContextMenu.Root defaultOpen>
                <ContextMenu.Trigger>Open</ContextMenu.Trigger>
                <ContextMenu.Content>
                    <ContextMenu.Item>Item</ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Root>
        );

        expect(warn).not.toHaveBeenCalled();
        warn.mockRestore();
    });

    test('content is accessible when open', () => {
        render(
            <ContextMenu.Root defaultOpen>
                <ContextMenu.Trigger>Open</ContextMenu.Trigger>
                <ContextMenu.Content>
                    <ContextMenu.Item>Visible Item</ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Root>
        );

        expect(screen.getByText('Visible Item')).toBeInTheDocument();
    });
});
