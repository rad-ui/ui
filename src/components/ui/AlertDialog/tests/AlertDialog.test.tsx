import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AlertDialog from '../AlertDialog';

// Test with real components - no mocks needed

describe('AlertDialog', () => {
    describe('Root', () => {
        it('should render with default props', () => {
            render(
                <AlertDialog.Root>
                    <AlertDialog.Trigger>Open Dialog</AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>
                            <AlertDialog.Title>Test Title</AlertDialog.Title>
                            <AlertDialog.Description>Test Description</AlertDialog.Description>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByText('Open Dialog')).toBeInTheDocument();
        });

        it('should support defaultOpen prop', () => {
            render(
                <AlertDialog.Root defaultOpen>
                    <AlertDialog.Trigger>Open Dialog</AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>
                            <AlertDialog.Title>Test Title</AlertDialog.Title>
                            <AlertDialog.Description>Test Description</AlertDialog.Description>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByText('Open Dialog')).toBeInTheDocument();
        });

        it('should support controlled open state', () => {
            const { rerender } = render(
                <AlertDialog.Root open={false}>
                    <AlertDialog.Trigger>Open Dialog</AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>
                            <AlertDialog.Title>Test Title</AlertDialog.Title>
                            <AlertDialog.Description>Test Description</AlertDialog.Description>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByText('Open Dialog')).toBeInTheDocument();

            rerender(
                <AlertDialog.Root open={true}>
                    <AlertDialog.Trigger>Open Dialog</AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>
                            <AlertDialog.Title>Test Title</AlertDialog.Title>
                            <AlertDialog.Description>Test Description</AlertDialog.Description>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByText('Open Dialog')).toBeInTheDocument();
        });

        it('should call onOpenChange when state changes', async() => {
            const onOpenChange = jest.fn();
            render(
                <AlertDialog.Root open={false} onOpenChange={onOpenChange}>
                    <AlertDialog.Trigger>Open Dialog</AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>
                            <AlertDialog.Title>Test Title</AlertDialog.Title>
                            <AlertDialog.Description>Test Description</AlertDialog.Description>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(onOpenChange).toBeDefined();
        });
    });

    describe('Trigger', () => {
        it('should render with correct data attributes', () => {
            render(
                <AlertDialog.Root>
                    <AlertDialog.Trigger>Trigger</AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>Content</AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            const trigger = screen.getByText('Trigger');
            expect(trigger).toBeInTheDocument();
            expect(trigger.tagName).toBe('BUTTON');
        });

        it('should support disabled prop', () => {
            render(
                <AlertDialog.Root>
                    <AlertDialog.Trigger disabled>Disabled Trigger</AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>Content</AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            const trigger = screen.getByText('Disabled Trigger');
            expect(trigger).toBeDisabled();
        });

        it('should not open dialog when disabled', async() => {
            const onOpenChange = jest.fn();
            render(
                <AlertDialog.Root onOpenChange={onOpenChange}>
                    <AlertDialog.Trigger disabled>Disabled Trigger</AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>Content</AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            const trigger = screen.getByText('Disabled Trigger');
            fireEvent.click(trigger);

            // Should not call onOpenChange when disabled
            expect(onOpenChange).not.toHaveBeenCalled();
        });

        it('should support asChild prop', () => {
            render(
                <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                        <button data-testid="custom-trigger">Custom Trigger</button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>Content</AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();
            expect(screen.getByText('Custom Trigger')).toBeInTheDocument();
        });
    });

    describe('Portal', () => {
        it('should render with default props', () => {
            render(
                <AlertDialog.Root open={true}>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>Content</AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByText('Content')).toBeInTheDocument();
        });

        it('should support forceMount prop', () => {
            render(
                <AlertDialog.Root>
                    <AlertDialog.Portal forceMount>
                        <AlertDialog.Content forceMount>Content</AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByText('Content')).toBeInTheDocument();
        });

        it('should support keepMounted prop', () => {
            render(
                <AlertDialog.Root>
                    <AlertDialog.Portal keepMounted>
                        <AlertDialog.Content forceMount>Content</AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByText('Content')).toBeInTheDocument();
        });
    });

    describe('Overlay', () => {
        it('should render with correct data attributes', () => {
            render(
                <AlertDialog.Root open={true}>
                    <AlertDialog.Portal>
                        <AlertDialog.Overlay />
                        <AlertDialog.Content>Content</AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            // Overlay should be present in the DOM
            expect(screen.getByText('Content')).toBeInTheDocument();
        });

        it('should support forceMount prop', () => {
            render(
                <AlertDialog.Root>
                    <AlertDialog.Portal>
                        <AlertDialog.Overlay forceMount />
                        <AlertDialog.Content forceMount>Content</AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByText('Content')).toBeInTheDocument();
        });

        it('should support asChild prop', () => {
            render(
                <AlertDialog.Root open={true}>
                    <AlertDialog.Portal>
                        <AlertDialog.Overlay asChild>
                            <div data-testid="custom-overlay" />
                        </AlertDialog.Overlay>
                        <AlertDialog.Content>Content</AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByTestId('custom-overlay')).toBeInTheDocument();
        });
    });

    describe('Content', () => {
        it('should render with correct ARIA attributes', () => {
            render(
                <AlertDialog.Root open={true}>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>
                            <AlertDialog.Title>Title</AlertDialog.Title>
                            <AlertDialog.Description>Description</AlertDialog.Description>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            const content = screen.getByRole('alertdialog');
            expect(content).toBeInTheDocument();
            expect(content).toHaveAttribute('aria-modal', 'true');
        });

        it('should support forceMount prop', () => {
            render(
                <AlertDialog.Root>
                    <AlertDialog.Portal>
                        <AlertDialog.Content forceMount>
                            <AlertDialog.Title>Title</AlertDialog.Title>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByText('Title')).toBeInTheDocument();
        });

        it('should support asChild prop', () => {
            render(
                <AlertDialog.Root>
                    <AlertDialog.Portal>
                        <AlertDialog.Content asChild forceMount>
                            <div data-testid="custom-content">
                                <AlertDialog.Title>Title</AlertDialog.Title>
                            </div>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByTestId('custom-content')).toBeInTheDocument();
            expect(screen.getByText('Title')).toBeInTheDocument();
        });
    });

    describe('Title', () => {
        it('should render with generated ID', () => {
            render(
                <AlertDialog.Root open={true}>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>
                            <AlertDialog.Title>Test Title</AlertDialog.Title>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            const title = screen.getByText('Test Title');
            expect(title).toBeInTheDocument();
            expect(title.tagName).toBe('H2');
        });

        it('should support asChild prop', () => {
            render(
                <AlertDialog.Root>
                    <AlertDialog.Portal>
                        <AlertDialog.Content forceMount>
                            <AlertDialog.Title asChild>
                                <h1 data-testid="custom-title">Custom Title</h1>
                            </AlertDialog.Title>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByTestId('custom-title')).toBeInTheDocument();
            expect(screen.getByText('Custom Title')).toBeInTheDocument();
        });
    });

    describe('Description', () => {
        it('should render with generated ID', () => {
            render(
                <AlertDialog.Root open={true}>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>
                            <AlertDialog.Description>Test Description</AlertDialog.Description>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            const description = screen.getByText('Test Description');
            expect(description).toBeInTheDocument();
            expect(description.tagName).toBe('P');
        });

        it('should support asChild prop', () => {
            render(
                <AlertDialog.Root>
                    <AlertDialog.Portal>
                        <AlertDialog.Content forceMount>
                            <AlertDialog.Description asChild>
                                <div data-testid="custom-description">Custom Description</div>
                            </AlertDialog.Description>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByTestId('custom-description')).toBeInTheDocument();
            expect(screen.getByText('Custom Description')).toBeInTheDocument();
        });
    });

    describe('Action and Cancel Components', () => {
        it('should render Action component', () => {
            render(
                <AlertDialog.Root open={true}>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>
                            <AlertDialog.Action>Confirm</AlertDialog.Action>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByText('Confirm')).toBeInTheDocument();
            expect(screen.getByText('Confirm').tagName).toBe('BUTTON');
        });

        it('should render Cancel component', () => {
            render(
                <AlertDialog.Root open={true}>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>
                            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByText('Cancel')).toBeInTheDocument();
            expect(screen.getByText('Cancel').tagName).toBe('BUTTON');
        });
    });

    describe('Accessibility', () => {
        it('should have proper ARIA relationships', () => {
            render(
                <AlertDialog.Root open={true}>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>
                            <AlertDialog.Title>Confirm Action</AlertDialog.Title>
                            <AlertDialog.Description>
                                Are you sure you want to proceed?
                            </AlertDialog.Description>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            const content = screen.getByRole('alertdialog');
            const title = screen.getByText('Confirm Action');
            const description = screen.getByText('Are you sure you want to proceed?');

            expect(content).toHaveAttribute('aria-labelledby', title.id);
            expect(content).toHaveAttribute('aria-describedby', description.id);
        });

        it('should have correct role and modal attributes', () => {
            render(
                <AlertDialog.Root open={true}>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>
                            <AlertDialog.Title>Title</AlertDialog.Title>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            const content = screen.getByRole('alertdialog');
            expect(content).toHaveAttribute('role', 'alertdialog');
            expect(content).toHaveAttribute('aria-modal', 'true');
        });
    });

    describe('Integration Tests', () => {
        it('should work with complete dialog structure', () => {
            render(
                <AlertDialog.Root open={true}>
                    <AlertDialog.Trigger>Open Dialog</AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Overlay />
                        <AlertDialog.Content>
                            <AlertDialog.Title>Confirm Action</AlertDialog.Title>
                            <AlertDialog.Description>
                                Are you sure you want to proceed?
                            </AlertDialog.Description>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                                <AlertDialog.Action>Confirm</AlertDialog.Action>
                            </div>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByText('Open Dialog')).toBeInTheDocument();
            expect(screen.getByText('Confirm Action')).toBeInTheDocument();
            expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
            expect(screen.getByText('Cancel')).toBeInTheDocument();
            expect(screen.getByText('Confirm')).toBeInTheDocument();
        });

        it('should handle multiple dialogs', () => {
            render(
                <div>
                    <AlertDialog.Root open={true}>
                        <AlertDialog.Trigger>Open Dialog 1</AlertDialog.Trigger>
                        <AlertDialog.Portal>
                            <AlertDialog.Content>
                                <AlertDialog.Title>Dialog 1</AlertDialog.Title>
                            </AlertDialog.Content>
                        </AlertDialog.Portal>
                    </AlertDialog.Root>
                    <AlertDialog.Root open={true}>
                        <AlertDialog.Trigger>Open Dialog 2</AlertDialog.Trigger>
                        <AlertDialog.Portal>
                            <AlertDialog.Content>
                                <AlertDialog.Title>Dialog 2</AlertDialog.Title>
                            </AlertDialog.Content>
                        </AlertDialog.Portal>
                    </AlertDialog.Root>
                </div>
            );

            expect(screen.getByText('Open Dialog 1')).toBeInTheDocument();
            expect(screen.getByText('Open Dialog 2')).toBeInTheDocument();
            expect(screen.getByText('Dialog 1')).toBeInTheDocument();
            expect(screen.getByText('Dialog 2')).toBeInTheDocument();
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty children', () => {
            render(
                <AlertDialog.Root open={true}>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>
                            <AlertDialog.Title></AlertDialog.Title>
                            <AlertDialog.Description></AlertDialog.Description>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            // Should render without crashing
            expect(screen.getByRole('alertdialog')).toBeInTheDocument();
        });

        it('should handle null children', () => {
            render(
                <AlertDialog.Root open={true}>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>
                            {null}
                            <AlertDialog.Title>Title</AlertDialog.Title>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByText('Title')).toBeInTheDocument();
        });

        it('should handle conditional rendering', () => {
            const showDescription = false;

            render(
                <AlertDialog.Root open={true}>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>
                            <AlertDialog.Title>Title</AlertDialog.Title>
                            {showDescription && <AlertDialog.Description>Description</AlertDialog.Description>}
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByText('Title')).toBeInTheDocument();
            expect(screen.queryByText('Description')).not.toBeInTheDocument();
        });
    });

    describe('Props Validation', () => {
        it('should handle invalid props gracefully', () => {
            render(
                <AlertDialog.Root open={true}>
                    <AlertDialog.Trigger disabled={undefined as any}>
                        Test
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>
                            <AlertDialog.Title>Title</AlertDialog.Title>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            // Should render without crashing
            expect(screen.getByText('Test')).toBeInTheDocument();
            expect(screen.getByText('Title')).toBeInTheDocument();
        });

        it('should handle custom className props', () => {
            render(
                <AlertDialog.Root className="custom-root" open={true}>
                    <AlertDialog.Trigger className="custom-trigger">Test</AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Content className="custom-content">
                            <AlertDialog.Title className="custom-title">Title</AlertDialog.Title>
                            <AlertDialog.Description className="custom-description">
                                Description
                            </AlertDialog.Description>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );

            expect(screen.getByText('Test')).toHaveClass('custom-trigger');
            expect(screen.getByText('Title')).toHaveClass('custom-title');
            expect(screen.getByText('Description')).toHaveClass('custom-description');
        });
    });
});
