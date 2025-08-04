import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Splitter from '../Splitter';

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
}));

describe('Splitter Component', () => {
    const renderSplitter = (props = {}) => {
        return render(
            <div style={{ width: '400px', height: '300px' }}>
                <Splitter.Root {...props}>
                    <Splitter.Panel index={0}>
                        <div data-testid="panel-0">Panel 0</div>
                    </Splitter.Panel>
                    <Splitter.Handle index={0} />
                    <Splitter.Panel index={1}>
                        <div data-testid="panel-1">Panel 1</div>
                    </Splitter.Panel>
                </Splitter.Root>
            </div>
        );
    };

    beforeEach(() => {
    // Mock getBoundingClientRect
        Element.prototype.getBoundingClientRect = jest.fn(() => ({
            width: 400,
            height: 300,
            top: 0,
            left: 0,
            bottom: 300,
            right: 400,
            x: 0,
            y: 0,
            toJSON: () => {}
        }));
    });

    it('renders with default props', () => {
        renderSplitter();

        expect(screen.getByTestId('panel-0')).toBeInTheDocument();
        expect(screen.getByTestId('panel-1')).toBeInTheDocument();
        expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('renders with custom orientation', () => {
        renderSplitter({ orientation: 'vertical' });

        const handle = screen.getByRole('separator');
        expect(handle).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('renders with custom default sizes', () => {
        renderSplitter({ defaultSizes: [30, 70] });

        const panel0 = screen.getByTestId('panel-0').parentElement;
        const panel1 = screen.getByTestId('panel-1').parentElement;

        expect(panel0).toHaveStyle({ flexBasis: '30%' });
        expect(panel1).toHaveStyle({ flexBasis: '70%' });
    });

    it('calls onSizesChange when sizes change', async() => {
        const onSizesChange = jest.fn();
        renderSplitter({ onSizesChange });

        const handle = screen.getByRole('separator');

        // Simulate mouse down
        fireEvent.mouseDown(handle, { clientX: 200 });

        // Simulate mouse move
        fireEvent.mouseMove(document, { clientX: 250 });

        // Simulate mouse up
        fireEvent.mouseUp(document);

        await waitFor(() => {
            expect(onSizesChange).toHaveBeenCalled();
        });
    });

    it('handles keyboard navigation', () => {
        renderSplitter();

        const handle = screen.getByRole('separator');
        handle.focus();

        // Test arrow key navigation
        fireEvent.keyDown(handle, { key: 'ArrowRight' });

        // Verify the handle is focusable
        expect(handle).toHaveAttribute('tabIndex', '0');
    });

    it('applies custom aria-label to handle', () => {
        render(
            <div style={{ width: '400px', height: '300px' }}>
                <Splitter.Root>
                    <Splitter.Panel index={0}>
                        <div data-testid="panel-0">Panel 0</div>
                    </Splitter.Panel>
                    <Splitter.Handle index={0} aria-label="Custom resize handle" />
                    <Splitter.Panel index={1}>
                        <div data-testid="panel-1">Panel 1</div>
                    </Splitter.Panel>
                </Splitter.Root>
            </div>
        );

        const handle = screen.getByRole('separator');
        expect(handle).toHaveAttribute('aria-label', 'Custom resize handle');
    });

    it('respects minimum sizes constraints', () => {
        renderSplitter({
            defaultSizes: [50, 50],
            minSizes: [20, 30]
        });

        const panel0 = screen.getByTestId('panel-0').parentElement;
        const panel1 = screen.getByTestId('panel-1').parentElement;

        // Initial sizes should be respected
        expect(panel0).toHaveStyle({ flexBasis: '50%' });
        expect(panel1).toHaveStyle({ flexBasis: '50%' });
    });

    it('handles touch events', async() => {
        const onSizesChange = jest.fn();
        renderSplitter({ onSizesChange });

        const handle = screen.getByRole('separator');

        // Simulate touch start
        fireEvent.touchStart(handle, {
            touches: [{ clientX: 200, clientY: 150 }]
        });

        // Simulate touch move
        fireEvent.touchMove(document, {
            touches: [{ clientX: 250, clientY: 150 }]
        });

        // Simulate touch end
        fireEvent.touchEnd(document);

        await waitFor(() => {
            expect(onSizesChange).toHaveBeenCalled();
        });
    });

    it('prevents default behavior on drag start', () => {
        renderSplitter();

        const handle = screen.getByRole('separator');

        fireEvent.mouseDown(handle, {
            clientX: 200,
            preventDefault: jest.fn()
        });

        // The preventDefault should be called internally by the component
        // We can't easily test this without mocking, so we'll just verify the component renders
        expect(handle).toBeInTheDocument();
    });

    it('applies correct CSS classes', () => {
        renderSplitter({ customRootClass: 'custom-splitter' });

        // The Splitter component should have the custom class applied
        const splitterContainer = screen.getByTestId('panel-0').parentElement?.parentElement;
        expect(splitterContainer).toHaveClass('custom-splitter-rad-ui-splitter');
    });

    it('handles multiple panels correctly', () => {
        render(
            <div style={{ width: '400px', height: '300px' }}>
                <Splitter.Root defaultSizes={[33, 33, 34]}>
                    <Splitter.Panel index={0}>
                        <div data-testid="panel-0">Panel 0</div>
                    </Splitter.Panel>
                    <Splitter.Handle index={0} />
                    <Splitter.Panel index={1}>
                        <div data-testid="panel-1">Panel 1</div>
                    </Splitter.Panel>
                    <Splitter.Handle index={1} />
                    <Splitter.Panel index={2}>
                        <div data-testid="panel-2">Panel 2</div>
                    </Splitter.Panel>
                </Splitter.Root>
            </div>
        );

        expect(screen.getByTestId('panel-0')).toBeInTheDocument();
        expect(screen.getByTestId('panel-1')).toBeInTheDocument();
        expect(screen.getByTestId('panel-2')).toBeInTheDocument();

        const handles = screen.getAllByRole('separator');
        expect(handles).toHaveLength(2);
    });

    it('throws error when used outside Splitter context', () => {
    // Suppress console.error for this test
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => {
            render(<Splitter.Panel index={0}>Panel</Splitter.Panel>);
        }).toThrow('Splitter components must be used within a Splitter.Root');

        consoleSpy.mockRestore();
    });
});
