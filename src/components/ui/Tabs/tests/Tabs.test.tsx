import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tabs from '../Tabs';

describe('Tabs Component', () => {
    // Basic functionality tests
    describe('Basic Functionality', () => {
        test('renders tabs and shows correct content for default tab', () => {
            render(
                <Tabs.Root defaultValue="tab2">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1">Content 1</Tabs.Content>
                    <Tabs.Content value="tab2">Content 2</Tabs.Content>
                    <Tabs.Content value="tab3">Content 3</Tabs.Content>
                </Tabs.Root>
            );

            // Check that all tabs are rendered
            expect(screen.getByText('Tab 1')).toBeInTheDocument();
            expect(screen.getByText('Tab 2')).toBeInTheDocument();
            expect(screen.getByText('Tab 3')).toBeInTheDocument();

            // Check that only the default content is visible
            expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
            expect(screen.getByText('Content 2')).toBeInTheDocument();
            expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
        });

        test('switches tab content when clicking on tabs', () => {
            render(
                <Tabs.Root defaultValue="tab1">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1">Content 1</Tabs.Content>
                    <Tabs.Content value="tab2">Content 2</Tabs.Content>
                    <Tabs.Content value="tab3">Content 3</Tabs.Content>
                </Tabs.Root>
            );

            // Initial state
            expect(screen.getByText('Content 1')).toBeInTheDocument();

            // Click on tab 2
            fireEvent.click(screen.getByText('Tab 2'));

            // Check content updated
            expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
            expect(screen.getByText('Content 2')).toBeInTheDocument();

            // Click on tab 3
            fireEvent.click(screen.getByText('Tab 3'));

            // Check content updated again
            expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
            expect(screen.getByText('Content 3')).toBeInTheDocument();
        });
    });

    // Controlled vs Uncontrolled behavior
    describe('Controlled vs Uncontrolled', () => {
        test('uncontrolled tabs work with defaultValue', () => {
            render(
                <Tabs.Root defaultValue="tab2">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1">Content 1</Tabs.Content>
                    <Tabs.Content value="tab2">Content 2</Tabs.Content>
                </Tabs.Root>
            );

            // Default tab content is visible
            expect(screen.getByText('Content 2')).toBeInTheDocument();

            // Switch tab
            fireEvent.click(screen.getByText('Tab 1'));
            expect(screen.getByText('Content 1')).toBeInTheDocument();
        });

        test('controlled tabs work with value and onValueChange', () => {
            const TestComponent = () => {
                const [value, setValue] = React.useState('tab1');
                return (
                    <>
                        <div data-testid="current-tab">Current: {value}</div>
                        <button onClick={() => setValue('tab2')}>Set to Tab 2</button>
                        <Tabs.Root value={value} onValueChange={setValue}>
                            <Tabs.List>
                                <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                                <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                            </Tabs.List>
                            <Tabs.Content value="tab1">Content 1</Tabs.Content>
                            <Tabs.Content value="tab2">Content 2</Tabs.Content>
                        </Tabs.Root>
                    </>
                );
            };

            render(<TestComponent />);

            // Initial state
            expect(screen.getByText('Content 1')).toBeInTheDocument();
            expect(screen.getByTestId('current-tab')).toHaveTextContent('Current: tab1');

            // Click external button to change tab
            fireEvent.click(screen.getByText('Set to Tab 2'));

            // Check if tab changed
            expect(screen.getByText('Content 2')).toBeInTheDocument();
            expect(screen.getByTestId('current-tab')).toHaveTextContent('Current: tab2');

            // Click tab 1
            fireEvent.click(screen.getByText('Tab 1'));

            // Check if state updated
            expect(screen.getByText('Content 1')).toBeInTheDocument();
            expect(screen.getByTestId('current-tab')).toHaveTextContent('Current: tab1');
        });
    });

    // Dynamic tabs
    describe('Dynamic Tabs', () => {
        test('handles dynamic tab updates', async() => {
            const DynamicTabs = () => {
                const [tabs, setTabs] = React.useState(['tab1', 'tab2']);
                const [activeTab, setActiveTab] = React.useState('tab1');

                React.useEffect(() => {
                    // Add a tab after render
                    const timer = setTimeout(() => {
                        setTabs([...tabs, 'tab3']);
                        setActiveTab('tab3');
                    }, 100);
                    return () => clearTimeout(timer);
                }, []);

                return (
                    <Tabs.Root defaultValue={activeTab}>
                        <Tabs.List>
                            {tabs.map(tab => (
                                <Tabs.Trigger key={tab} value={tab}>{tab}</Tabs.Trigger>
                            ))}
                        </Tabs.List>
                        {tabs.map(tab => (
                            <Tabs.Content key={tab} value={tab}>Content for {tab}</Tabs.Content>
                        ))}
                    </Tabs.Root>
                );
            };

            render(<DynamicTabs />);

            // Initial state
            expect(screen.getByText('tab1')).toBeInTheDocument();
            expect(screen.getByText('tab2')).toBeInTheDocument();
            expect(screen.queryByText('tab3')).not.toBeInTheDocument();

            // Wait for the new tab to appear
            await waitFor(() => {
                expect(screen.getByText('tab3')).toBeInTheDocument();
                expect(screen.getByText('Content for tab3')).toBeInTheDocument();
            });
        });
    });

    // Disabled tabs
    describe('Disabled Tabs', () => {
        test('disabled tabs cannot be selected', () => {
            render(
                <Tabs.Root defaultValue="tab1">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2" disabled>Tab 2 (Disabled)</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1">Content 1</Tabs.Content>
                    <Tabs.Content value="tab2">Content 2</Tabs.Content>
                    <Tabs.Content value="tab3">Content 3</Tabs.Content>
                </Tabs.Root>
            );

            // Initial state
            expect(screen.getByText('Content 1')).toBeInTheDocument();

            // Try to click disabled tab
            fireEvent.click(screen.getByText('Tab 2 (Disabled)'));

            // Content should not change
            expect(screen.getByText('Content 1')).toBeInTheDocument();
            expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

            // Click on tab 3 (enabled)
            fireEvent.click(screen.getByText('Tab 3'));

            // Content should change to tab 3
            expect(screen.getByText('Content 3')).toBeInTheDocument();
        });

        test('disabled tabs handle keyboard focus correctly', () => {
            render(
                <Tabs.Root defaultValue="tab1">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2" disabled>Tab 2 (Disabled)</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1">Content 1</Tabs.Content>
                    <Tabs.Content value="tab2">Content 2</Tabs.Content>
                    <Tabs.Content value="tab3">Content 3</Tabs.Content>
                </Tabs.Root>
            );

            // Initial state
            expect(screen.getByText('Content 1')).toBeInTheDocument();

            // Try to focus the disabled tab
            const disabledTab = screen.getByText('Tab 2 (Disabled)');
            fireEvent.focus(disabledTab);

            // Content should not change
            expect(screen.getByText('Content 1')).toBeInTheDocument();
            expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

            // Verify disabled state attributes
            expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
            expect(disabledTab).toHaveAttribute('disabled');

            // Test keyboard navigation
            const tab1 = screen.getByText('Tab 1');
            fireEvent.focus(tab1);
            fireEvent.keyDown(tab1, { key: 'ArrowRight' });

            // Focus should move to tab3, skipping the disabled tab2
            const tab3 = screen.getByText('Tab 3');
            expect(tab3).toHaveFocus();

            // Check that content updates when focusing on tab 3
            fireEvent.focus(tab3);
            expect(screen.getByText('Content 3')).toBeInTheDocument();
        });
    });

    // Nested tabs
    describe('Nested Tabs', () => {
        test('nested tabs maintain separate states', () => {
            render(
                <Tabs.Root defaultValue="outer1">
                    <Tabs.List>
                        <Tabs.Trigger value="outer1">Outer 1</Tabs.Trigger>
                        <Tabs.Trigger value="outer2">Outer 2</Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="outer1">
                        <div>Outer Content 1</div>
                        <Tabs.Root defaultValue="inner1">
                            <Tabs.List>
                                <Tabs.Trigger value="inner1">Inner 1</Tabs.Trigger>
                                <Tabs.Trigger value="inner2">Inner 2</Tabs.Trigger>
                            </Tabs.List>
                            <Tabs.Content value="inner1">Inner Content 1</Tabs.Content>
                            <Tabs.Content value="inner2">Inner Content 2</Tabs.Content>
                        </Tabs.Root>
                    </Tabs.Content>

                    <Tabs.Content value="outer2">
                        <div>Outer Content 2</div>
                        <Tabs.Root defaultValue="inner3">
                            <Tabs.List>
                                <Tabs.Trigger value="inner3">Inner 3</Tabs.Trigger>
                                <Tabs.Trigger value="inner4">Inner 4</Tabs.Trigger>
                            </Tabs.List>
                            <Tabs.Content value="inner3">Inner Content 3</Tabs.Content>
                            <Tabs.Content value="inner4">Inner Content 4</Tabs.Content>
                        </Tabs.Root>
                    </Tabs.Content>
                </Tabs.Root>
            );

            // Initial state - outer1 and inner1 should be visible
            expect(screen.getByText('Outer Content 1')).toBeInTheDocument();
            expect(screen.getByText('Inner Content 1')).toBeInTheDocument();

            // Click on inner2
            fireEvent.click(screen.getByText('Inner 2'));

            // Outer content should remain the same, inner content should change
            expect(screen.getByText('Outer Content 1')).toBeInTheDocument();
            expect(screen.getByText('Inner Content 2')).toBeInTheDocument();

            // Now click on outer2
            fireEvent.click(screen.getByText('Outer 2'));

            // Both outer and inner content should change
            expect(screen.getByText('Outer Content 2')).toBeInTheDocument();
            expect(screen.getByText('Inner Content 3')).toBeInTheDocument();

            // Click on inner4
            fireEvent.click(screen.getByText('Inner 4'));

            // Only inner content should change
            expect(screen.getByText('Outer Content 2')).toBeInTheDocument();
            expect(screen.getByText('Inner Content 4')).toBeInTheDocument();
        });
    });

    // Programmatic tab changes
    describe('Programmatic Tab Changes', () => {
        test('tabs can be changed programmatically', async() => {
            jest.useFakeTimers();

            const ProgrammaticTabs = () => {
                const [activeTab, setActiveTab] = React.useState('tab1');

                React.useEffect(() => {
                    const timer = setTimeout(() => {
                        setActiveTab('tab2');
                    }, 1000);

                    return () => clearTimeout(timer);
                }, []);

                return (
                    <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
                        <Tabs.List>
                            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                            <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content value="tab1">Content 1</Tabs.Content>
                        <Tabs.Content value="tab2">Content 2</Tabs.Content>
                        <Tabs.Content value="tab3">Content 3</Tabs.Content>
                    </Tabs.Root>
                );
            };

            render(<ProgrammaticTabs />);

            // Initial state
            expect(screen.getByText('Content 1')).toBeInTheDocument();

            // Advance timer
            act(() => {
                jest.advanceTimersByTime(1000);
            });

            // Content should have updated
            expect(screen.getByText('Content 2')).toBeInTheDocument();

            // Can still click on tabs
            fireEvent.click(screen.getByText('Tab 3'));
            expect(screen.getByText('Content 3')).toBeInTheDocument();

            jest.useRealTimers();
        });
    });

    // New props and attributes tests
    describe('New Props and Attributes', () => {
        test('orientation prop works correctly', () => {
            render(
                <Tabs.Root defaultValue="tab1" orientation="vertical">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1">Content 1</Tabs.Content>
                    <Tabs.Content value="tab2">Content 2</Tabs.Content>
                </Tabs.Root>
            );

            const root = screen.getByRole('tablist').closest('[data-orientation]');
            expect(root).toHaveAttribute('data-orientation', 'vertical');
        });

        test('activationMode manual requires click to activate', () => {
            render(
                <Tabs.Root defaultValue="tab1" activationMode="manual">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1">Content 1</Tabs.Content>
                    <Tabs.Content value="tab2">Content 2</Tabs.Content>
                </Tabs.Root>
            );

            // Initial state
            expect(screen.getByText('Content 1')).toBeInTheDocument();

            // Focus on tab 2 (should not activate in manual mode)
            const tab2 = screen.getByText('Tab 2');
            fireEvent.focus(tab2);

            // Content should not change
            expect(screen.getByText('Content 1')).toBeInTheDocument();

            // Click on tab 2 (should activate)
            fireEvent.click(tab2);
            expect(screen.getByText('Content 2')).toBeInTheDocument();
        });

        test('forceMount keeps content in DOM', () => {
            render(
                <Tabs.Root defaultValue="tab1">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1">Content 1</Tabs.Content>
                    <Tabs.Content value="tab2" forceMount>Content 2</Tabs.Content>
                </Tabs.Root>
            );

            // Both contents should be in DOM, but only tab1 should be visible
            expect(screen.getByText('Content 1')).toBeInTheDocument();
            expect(screen.getByText('Content 2')).toBeInTheDocument();

            // Tab 2 content should have aria-hidden="true"
            const tab2Content = screen.getByText('Content 2');
            expect(tab2Content).toHaveAttribute('aria-hidden', 'true');
        });

        test('data attributes are set correctly', () => {
            render(
                <Tabs.Root defaultValue="tab1" orientation="horizontal">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2" disabled>Tab 2</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1">Content 1</Tabs.Content>
                    <Tabs.Content value="tab2">Content 2</Tabs.Content>
                </Tabs.Root>
            );

            // Check root data-orientation
            const root = screen.getByRole('tablist').closest('[data-orientation]');
            expect(root).toHaveAttribute('data-orientation', 'horizontal');

            // Check trigger data attributes
            const tab1 = screen.getByText('Tab 1');
            const tab2 = screen.getByText('Tab 2');

            expect(tab1).toHaveAttribute('data-state', 'active');
            expect(tab1).toHaveAttribute('data-orientation', 'horizontal');
            expect(tab1).not.toHaveAttribute('data-disabled');

            expect(tab2).toHaveAttribute('data-state', 'inactive');
            expect(tab2).toHaveAttribute('data-orientation', 'horizontal');
            expect(tab2).toHaveAttribute('data-disabled', '');

            // Check content data attributes
            const content1 = screen.getByText('Content 1');
            expect(content1).toHaveAttribute('data-state', 'active');
            expect(content1).toHaveAttribute('data-orientation', 'horizontal');
        });

        test('dir prop is supported', () => {
            render(
                <Tabs.Root defaultValue="tab1" dir="rtl">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1">Content 1</Tabs.Content>
                    <Tabs.Content value="tab2">Content 2</Tabs.Content>
                </Tabs.Root>
            );

            // The component should render without errors when dir prop is provided
            expect(screen.getByText('Tab 1')).toBeInTheDocument();
            expect(screen.getByText('Tab 2')).toBeInTheDocument();
        });

        test('asChild prop is supported on TabList', () => {
            render(
                <Tabs.Root defaultValue="tab1">
                    <Tabs.List asChild>
                        <div data-testid="custom-list">
                            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                        </div>
                    </Tabs.List>
                    <Tabs.Content value="tab1">Content 1</Tabs.Content>
                    <Tabs.Content value="tab2">Content 2</Tabs.Content>
                </Tabs.Root>
            );

            // The TabList should render with asChild support
            expect(screen.getByTestId('custom-list')).toBeInTheDocument();
            expect(screen.getByText('Tab 1')).toBeInTheDocument();
            expect(screen.getByText('Tab 2')).toBeInTheDocument();
        });
    });

    describe('Ref forwarding and accessibility', () => {
        test('forwards refs to components', () => {
            const rootRef = React.createRef<HTMLDivElement>();
            const listRef = React.createRef<HTMLDivElement>();
            const triggerRef = React.createRef<HTMLButtonElement>();
            const contentRef = React.createRef<HTMLDivElement>();

            render(
                <Tabs.Root ref={rootRef} defaultValue="tab1">
                    <Tabs.List ref={listRef}>
                        <Tabs.Trigger ref={triggerRef} value="tab1">Tab 1</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content ref={contentRef} value="tab1">Content 1</Tabs.Content>
                </Tabs.Root>
            );

            expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
            expect(listRef.current).toBeInstanceOf(HTMLDivElement);
            expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
            expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
        });

        test('inactive content can be force mounted for screen readers', () => {
            render(
                <Tabs.Root defaultValue="tab1">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1">Content 1</Tabs.Content>
                    <Tabs.Content value="tab2" forceMount>Content 2</Tabs.Content>
                </Tabs.Root>
            );

            const hidden = screen.getByText('Content 2');
            expect(hidden).toHaveAttribute('aria-hidden', 'true');
        });

        test('components render without warnings', () => {
            const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

            render(
                <Tabs.Root defaultValue="tab1">
                    <Tabs.List>
                        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="tab1">Content 1</Tabs.Content>
                    <Tabs.Content value="tab2">Content 2</Tabs.Content>
                </Tabs.Root>
            );

            expect(warnSpy).not.toHaveBeenCalled();
            warnSpy.mockRestore();
        });
    });
});
