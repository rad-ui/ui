import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tabs from '../Tabs';

const rects: Record<string, Partial<DOMRect>> = {
    list: { left: 100, top: 50, width: 300, height: 40 },
    one: { left: 104, top: 54, width: 80, height: 32 },
    two: { left: 190, top: 54, width: 120, height: 32 }
};

const rectFor = (element: Element) => {
    const key = element.getAttribute('data-testid') ?? '';
    const r = rects[key] ?? {};
    return { left: 0, top: 0, width: 0, height: 0, right: 0, bottom: 0, x: 0, y: 0, toJSON: () => ({}), ...r } as DOMRect;
};

const Example = (props: React.ComponentProps<typeof Tabs.Root>) => (
    <Tabs.Root defaultValue="one" {...props}>
        <Tabs.List data-testid="list">
            <Tabs.Trigger value="one" data-testid="one">One</Tabs.Trigger>
            <Tabs.Trigger value="two" data-testid="two">Two</Tabs.Trigger>
            <Tabs.Indicator data-testid="indicator" />
        </Tabs.List>
        <Tabs.Content value="one">Panel one</Tabs.Content>
        <Tabs.Content value="two">Panel two</Tabs.Content>
    </Tabs.Root>
);

describe('Tabs.Indicator', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
        spy = jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function(this: Element) {
            return rectFor(this);
        });
    });
    afterEach(() => spy.mockRestore());

    test('positions itself over the active tab relative to the list', () => {
        render(<Example />);
        const indicator = screen.getByTestId('indicator');
        expect(indicator).toHaveAttribute('role', 'presentation');
        expect(indicator).toHaveAttribute('data-slot', 'tabs-indicator');
        expect(indicator).toHaveAttribute('data-orientation', 'horizontal');
        expect(indicator.style.getPropertyValue('--active-tab-left')).toBe('4px');
        expect(indicator.style.getPropertyValue('--active-tab-top')).toBe('4px');
        expect(indicator.style.getPropertyValue('--active-tab-width')).toBe('80px');
        expect(indicator.style.getPropertyValue('--active-tab-height')).toBe('32px');
    });

    test('moves to the newly selected tab and reports the direction', () => {
        render(<Example />);
        fireEvent.click(screen.getByTestId('two'));
        const indicator = screen.getByTestId('indicator');
        expect(indicator.style.getPropertyValue('--active-tab-left')).toBe('90px');
        expect(indicator.style.getPropertyValue('--active-tab-width')).toBe('120px');
        expect(indicator).toHaveAttribute('data-activation-direction', 'right');

        fireEvent.click(screen.getByTestId('one'));
        expect(indicator).toHaveAttribute('data-activation-direction', 'left');
    });

    test('renders nothing when no tab is selected', () => {
        render(<Example defaultValue="" />);
        expect(screen.queryByTestId('indicator')).not.toBeInTheDocument();
    });

    test('forwards its ref and merges the themed class', () => {
        const ref = React.createRef<HTMLSpanElement>();
        render(
            <Tabs.Root defaultValue="one" customRootClass="acme">
                <Tabs.List data-testid="list">
                    <Tabs.Trigger value="one" data-testid="one">One</Tabs.Trigger>
                    <Tabs.Indicator ref={ref} className="extra" />
                </Tabs.List>
            </Tabs.Root>
        );
        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toHaveClass('acme-tabs-indicator');
        expect(ref.current).toHaveClass('extra');
    });

    test('keeps forwarding the list and trigger refs', () => {
        const listRef = React.createRef<HTMLDivElement>();
        const triggerRef = React.createRef<HTMLButtonElement>();
        render(
            <Tabs.Root defaultValue="one">
                <Tabs.List ref={listRef}>
                    <Tabs.Trigger value="one" ref={triggerRef}>One</Tabs.Trigger>
                </Tabs.List>
            </Tabs.Root>
        );
        expect(listRef.current).toHaveAttribute('role', 'tablist');
        expect(triggerRef.current).toHaveAttribute('role', 'tab');
    });

    test('throws outside Tabs.Root', () => {
        const error = jest.spyOn(console, 'error').mockImplementation(() => {});
        expect(() => render(<Tabs.Indicator />)).toThrow('TabIndicator must be used within a TabRoot');
        error.mockRestore();
    });
});
