import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MenuPrimitive from '../MenuPrimitive';

// Mock console.warn to capture warnings
const originalWarn = console.warn;
const mockWarn = jest.fn();

describe('MenuPrimitive', () => {
    beforeEach(() => {
        console.warn = mockWarn;
        mockWarn.mockClear();
    });

    afterEach(() => {
        console.warn = originalWarn;
    });

    describe('Direct MenuPrimitive usage', () => {
        it('should warn when used directly and return null', () => {
            const { container } = render(<MenuPrimitive />);

            expect(mockWarn).toHaveBeenCalledWith(
                'Direct usage of MenuPrimitive is not supported. Please use MenuPrimitive.Root, MenuPrimitive.Item instead.'
            );
            expect(container.firstChild).toBeNull();
        });
    });

    describe('MenuPrimitive.Root', () => {
        it('should render with custom className', () => {
            render(
                <MenuPrimitive.Root className="custom-menu">
                    <div>Menu Content</div>
                </MenuPrimitive.Root>
            );

            const menuElement = screen.getByText('Menu Content').parentElement;
            expect(menuElement).toHaveClass('custom-menu');
        });

        it('should handle controlled open state', () => {
            const onOpenChange = jest.fn();

            render(
                <MenuPrimitive.Root open={true} onOpenChange={onOpenChange}>
                    <div>Menu Content</div>
                </MenuPrimitive.Root>
            );

            expect(screen.getByText('Menu Content')).toBeInTheDocument();
        });

        it('should handle defaultOpen prop', () => {
            render(
                <MenuPrimitive.Root defaultOpen={true}>
                    <div>Menu Content</div>
                </MenuPrimitive.Root>
            );

            expect(screen.getByText('Menu Content')).toBeInTheDocument();
        });

        it('should handle offset props', () => {
            render(
                <MenuPrimitive.Root crossAxisOffset={10} mainAxisOffset={20}>
                    <div>Menu Content</div>
                </MenuPrimitive.Root>
            );

            expect(screen.getByText('Menu Content')).toBeInTheDocument();
        });
    });

    describe('MenuPrimitive.Trigger', () => {
        it('should render trigger button', () => {
            render(
                <MenuPrimitive.Root>
                    <MenuPrimitive.Trigger>
                        <span>Open Menu</span>
                    </MenuPrimitive.Trigger>
                </MenuPrimitive.Root>
            );

            expect(screen.getByText('Open Menu')).toBeInTheDocument();
        });

        it('should render with custom className', () => {
            render(
                <MenuPrimitive.Root>
                    <MenuPrimitive.Trigger className="px-4 py-2 bg-blue-900 text-white rounded">
                        <span>Open Menu</span>
                    </MenuPrimitive.Trigger>
                </MenuPrimitive.Root>
            );

            const triggerButton = screen.getByText('Open Menu').closest('button');
            expect(triggerButton).toHaveClass('px-4', 'py-2', 'bg-blue-900', 'text-white', 'rounded');
        });

        it('should handle asChild prop', () => {
            render(
                <MenuPrimitive.Root>
                    <MenuPrimitive.Trigger asChild>
                        <span>Open Menu</span>
                    </MenuPrimitive.Trigger>
                </MenuPrimitive.Root>
            );

            expect(screen.getByText('Open Menu')).toBeInTheDocument();
        });

        it('should return null when used outside MenuPrimitive.Root context', () => {
            const { container } = render(
                <MenuPrimitive.Trigger>
                    <span>Open Menu</span>
                </MenuPrimitive.Trigger>
            );

            expect(container.firstChild).toBeNull();
        });
    });

    describe('MenuPrimitive.Item', () => {
        it('should render menu item', () => {
            render(
                <MenuPrimitive.Root>
                    <MenuPrimitive.Item>
                        <span>Menu Item</span>
                    </MenuPrimitive.Item>
                </MenuPrimitive.Root>
            );

            expect(screen.getByText('Menu Item')).toBeInTheDocument();
        });

        it('should render with custom className', () => {
            render(
                <MenuPrimitive.Root>
                    <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded">
                        <span>Menu Item</span>
                    </MenuPrimitive.Item>
                </MenuPrimitive.Root>
            );

            const itemButton = screen.getByText('Menu Item').closest('button');
            expect(itemButton).toHaveClass('px-4', 'py-2', 'hover:bg-gray-100', 'cursor-pointer', 'rounded');
        });

        it('should handle label prop', () => {
            render(
                <MenuPrimitive.Root>
                    <MenuPrimitive.Item label="Test Label">
                        <span>Menu Item</span>
                    </MenuPrimitive.Item>
                </MenuPrimitive.Root>
            );

            expect(screen.getByText('Menu Item')).toBeInTheDocument();
        });

        it('should return null when used outside MenuPrimitive.Root context', () => {
            const { container } = render(
                <MenuPrimitive.Item>
                    <span>Menu Item</span>
                </MenuPrimitive.Item>
            );

            expect(container.firstChild).toBeNull();
        });
    });

    describe('MenuPrimitive.Content', () => {
        it('should render content when menu is open', () => {
            render(
                <MenuPrimitive.Root defaultOpen={true}>
                    <MenuPrimitive.Content>
                        <div>Menu Content</div>
                    </MenuPrimitive.Content>
                </MenuPrimitive.Root>
            );

            expect(screen.getByText('Menu Content')).toBeInTheDocument();
        });

        it('should not render content when menu is closed', () => {
            render(
                <MenuPrimitive.Root defaultOpen={false}>
                    <MenuPrimitive.Content>
                        <div>Menu Content</div>
                    </MenuPrimitive.Content>
                </MenuPrimitive.Root>
            );

            expect(screen.queryByText('Menu Content')).not.toBeInTheDocument();
        });

        it('should render with custom className', () => {
            render(
                <MenuPrimitive.Root defaultOpen={true}>
                    <MenuPrimitive.Content className="flex flex-col mt-2 bg-gray-1000 border border-gray-200 rounded shadow-lg min-w-[180px]">
                        <div>Menu Content</div>
                    </MenuPrimitive.Content>
                </MenuPrimitive.Root>
            );

            const contentElement = screen.getByText('Menu Content').parentElement;
            expect(contentElement).toHaveClass('flex', 'flex-col', 'mt-2', 'bg-gray-1000', 'border', 'border-gray-200', 'rounded', 'shadow-lg', 'min-w-[180px]');
        });

        it('should return null when used outside MenuPrimitive.Root context', () => {
            const { container } = render(
                <MenuPrimitive.Content>
                    <div>Menu Content</div>
                </MenuPrimitive.Content>
            );

            expect(container.firstChild).toBeNull();
        });
    });

    describe('MenuPrimitive.Sub', () => {
        it('should render sub menu', () => {
            render(
                <MenuPrimitive.Sub>
                    <div>Sub Menu</div>
                </MenuPrimitive.Sub>
            );

            expect(screen.getByText('Sub Menu')).toBeInTheDocument();
        });

        it('should render with custom className', () => {
            render(
                <MenuPrimitive.Sub className="flex flex-col">
                    <div>Sub Menu</div>
                </MenuPrimitive.Sub>
            );

            const subElement = screen.getByText('Sub Menu').parentElement;
            expect(subElement).toHaveClass('flex', 'flex-col');
        });

        it('should handle controlled open state', () => {
            const onOpenChange = jest.fn();

            render(
                <MenuPrimitive.Sub open={true} onOpenChange={onOpenChange}>
                    <div>Sub Menu</div>
                </MenuPrimitive.Sub>
            );

            expect(screen.getByText('Sub Menu')).toBeInTheDocument();
        });

        it('should handle defaultOpen prop', () => {
            render(
                <MenuPrimitive.Sub defaultOpen={true}>
                    <div>Sub Menu</div>
                </MenuPrimitive.Sub>
            );

            expect(screen.getByText('Sub Menu')).toBeInTheDocument();
        });
    });

    describe('MenuPrimitive.Portal', () => {
        beforeEach(() => {
            // Mock document.querySelector
            Object.defineProperty(document, 'querySelector', {
                value: jest.fn(() => document.body),
                writable: true
            });
        });

        it('should render portal when menu is open', () => {
            render(
                <MenuPrimitive.Root defaultOpen={true}>
                    <MenuPrimitive.Portal>
                        <div>Portal Content</div>
                    </MenuPrimitive.Portal>
                </MenuPrimitive.Root>
            );

            expect(screen.getByText('Portal Content')).toBeInTheDocument();
        });

        it('should not render portal when menu is closed', () => {
            render(
                <MenuPrimitive.Root defaultOpen={false}>
                    <MenuPrimitive.Portal>
                        <div>Portal Content</div>
                    </MenuPrimitive.Portal>
                </MenuPrimitive.Root>
            );

            expect(screen.queryByText('Portal Content')).not.toBeInTheDocument();
        });

        it('should return null when used outside MenuPrimitive.Root context', () => {
            const { container } = render(
                <MenuPrimitive.Portal>
                    <div>Portal Content</div>
                </MenuPrimitive.Portal>
            );

            expect(container.firstChild).toBeNull();
        });
    });

    describe('Complete Menu Integration', () => {
        it('should render a complete menu with all components like in stories', () => {
            render(
                <MenuPrimitive.Root defaultOpen={true}>
                    <MenuPrimitive.Trigger className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Trigger
                    </MenuPrimitive.Trigger>
                    <MenuPrimitive.Portal>
                        <MenuPrimitive.Content className="flex flex-col mt-2 bg-gray-1000 border border-gray-200 rounded shadow-lg min-w-[180px]">
                            <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded" label="item 1">
                item 1
                            </MenuPrimitive.Item>
                            <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded" label="item 2">
                item 2
                            </MenuPrimitive.Item>
                            <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded" label="item 3">
                item 3
                            </MenuPrimitive.Item>
                            <MenuPrimitive.Sub className="flex flex-col" defaultOpen={true}>
                                <MenuPrimitive.Trigger className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded">
                  Nested Trigger
                                </MenuPrimitive.Trigger>
                                <MenuPrimitive.Content className="flex flex-col mt-2 bg-gray-1000 border border-gray-200 rounded shadow min-w-[160px]">
                                    <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded" label="Nested item 1">
                    Nested item 1
                                    </MenuPrimitive.Item>
                                    <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded" label="Nested item 2">
                    Nested item 2
                                    </MenuPrimitive.Item>
                                </MenuPrimitive.Content>
                            </MenuPrimitive.Sub>
                            <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded">
                item 4
                            </MenuPrimitive.Item>
                            <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded">
                item 5
                            </MenuPrimitive.Item>
                        </MenuPrimitive.Content>
                    </MenuPrimitive.Portal>
                </MenuPrimitive.Root>
            );

            expect(screen.getByText('Nested Trigger')).toBeInTheDocument();
            expect(screen.getByText('item 1')).toBeInTheDocument();
            expect(screen.getByText('item 2')).toBeInTheDocument();
            expect(screen.getByText('item 3')).toBeInTheDocument();
            expect(screen.getByText('Nested item 1')).toBeInTheDocument();
            expect(screen.getByText('Nested item 2')).toBeInTheDocument();
            expect(screen.getByText('item 4')).toBeInTheDocument();
            expect(screen.getByText('item 5')).toBeInTheDocument();
        });

        it('should handle menu interactions', async() => {
            const onOpenChange = jest.fn();

            render(
                <MenuPrimitive.Root onOpenChange={onOpenChange}>
                    <MenuPrimitive.Trigger className="px-4 py-2 bg-blue-900 text-white rounded">
            Open Menu
                    </MenuPrimitive.Trigger>
                    <MenuPrimitive.Content className="flex flex-col mt-2 bg-gray-1000 border border-gray-200 rounded shadow-lg min-w-[180px]">
                        <MenuPrimitive.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded">
              Menu Item
                        </MenuPrimitive.Item>
                    </MenuPrimitive.Content>
                </MenuPrimitive.Root>
            );

            const trigger = screen.getByText('Open Menu');
            fireEvent.click(trigger);

            await waitFor(() => {
                expect(onOpenChange).toHaveBeenCalled();
            });
        });
    });
});
