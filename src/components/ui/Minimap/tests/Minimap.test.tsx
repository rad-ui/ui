import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Minimap from '../Minimap';

const renderMinimap = (props = {}) => render(
    <Minimap.Provider>
        <Minimap.Root data-testid="root">
            <Minimap.Item value="0">
                <Minimap.Track>
                    <Minimap.Bubble>1</Minimap.Bubble>
                    <Minimap.Line />
                </Minimap.Track>
                <Minimap.Content>First step</Minimap.Content>
            </Minimap.Item>
            <Minimap.Item value="1">
                <Minimap.Track>
                    <Minimap.Bubble>2</Minimap.Bubble>
                    <Minimap.Line />
                </Minimap.Track>
                <Minimap.Content>Second step</Minimap.Content>
            </Minimap.Item>
        </Minimap.Root>
    </Minimap.Provider>
);

describe('Minimap', () => {
    test('warns on direct usage', () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        render(<Minimap />);
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('Direct usage of Minimap is not supported'));
        warn.mockRestore();
    });

    test('renders each item as a button', () => {
        renderMinimap();
        expect(screen.getAllByRole('button')).toHaveLength(2);
    });

    test('renders item content', () => {
        renderMinimap();
        expect(screen.getByText('First step')).toBeInTheDocument();
        expect(screen.getByText('Second step')).toBeInTheDocument();
    });

    test('renders bubbles and lines', () => {
        renderMinimap();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getAllByText('2')).toHaveLength(1);
    });

    // Items are driven by an IntersectionObserver fed scroll position. jsdom has
    // no layout, so nothing is ever visible; the attribute must still be present
    // and defaulted rather than missing.
    test('items expose an in-view state', () => {
        renderMinimap();
        const buttons = screen.getAllByRole('button');
        buttons.forEach((button) => {
            expect(button).toHaveAttribute('data-in-view');
            expect(['true', 'false']).toContain(button.getAttribute('data-in-view'));
        });
    });

    test('clicking an item does not throw', () => {
        renderMinimap();
        const buttons = screen.getAllByRole('button');
        expect(() => buttons[1].click()).not.toThrow();
    });

    test('merges caller className on items', () => {
        render(
            <Minimap.Provider>
                <Minimap.Root>
                    <Minimap.Item value="0" className="custom-item">One</Minimap.Item>
                </Minimap.Root>
            </Minimap.Provider>
        );
        expect(screen.getByRole('button')).toHaveClass('custom-item');
    });

    test('root accepts arbitrary props', () => {
        renderMinimap();
        expect(screen.getByTestId('root')).toBeInTheDocument();
    });
});

describe('Minimap keyboard navigation', () => {
    test('roving focus: items are focusable', () => {
        renderMinimap();
        const buttons = screen.getAllByRole('button');
        // RovingFocusGroup owns the tabbable item, so exactly one is tabbable.
        const tabbable = buttons.filter((b) => b.getAttribute('tabindex') !== '-1');
        expect(tabbable.length).toBeGreaterThanOrEqual(1);
    });

    test('arrow key moves focus between items', async() => {
        const user = userEvent.setup();
        renderMinimap();
        const buttons = screen.getAllByRole('button');
        buttons[0].focus();
        await user.keyboard('{ArrowDown}');
        expect(document.activeElement).not.toBe(buttons[0]);
    });
});

describe('Minimap accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = renderMinimap();
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});

describe('Minimap regressions', () => {
    test('items do not leak roving aria-selected or a value attribute onto role="button"', () => {
        renderMinimap();
        screen.getAllByRole('button').forEach((button) => {
            expect(button).not.toHaveAttribute('aria-selected');
            expect(button).not.toHaveAttribute('value');
        });
    });

    test('waypoints do not log to the console', () => {
        const log = jest.spyOn(console, 'log').mockImplementation(() => {});
        const observers: Array<{ callback: IntersectionObserverCallback; node?: Element }> = [];
        const original = (window as any).IntersectionObserver;
        (window as any).IntersectionObserver = class {
            callback: IntersectionObserverCallback;
            constructor(callback: IntersectionObserverCallback) {
                this.callback = callback;
                observers.push({ callback });
            }

            observe(node: Element) { observers[observers.length - 1].node = node; }
            unobserve() {}
            disconnect() {}
        };

        render(
            <Minimap.Provider>
                <Minimap.Waypoint value="intro" />
                <Minimap.Root>
                    <Minimap.Item value="intro">Intro</Minimap.Item>
                </Minimap.Root>
            </Minimap.Provider>
        );

        act(() => {
            observers.forEach(({ callback, node }) => callback([{ isIntersecting: true, target: node } as any], {} as any));
        });
        expect(screen.getByRole('button', { name: 'Intro' })).toHaveAttribute('data-in-view', 'true');
        expect(log).not.toHaveBeenCalled();

        if (original) (window as any).IntersectionObserver = original;
        else delete (window as any).IntersectionObserver;
        log.mockRestore();
    });

    test('clicking an item scrolls the document to its waypoint when no scroll container exists', async() => {
        const user = userEvent.setup();
        const scrollIntoView = jest.fn();
        const original = Element.prototype.scrollIntoView;
        Element.prototype.scrollIntoView = scrollIntoView;

        render(
            <Minimap.Provider>
                <Minimap.Waypoint value="details" data-testid="waypoint" />
                <Minimap.Root>
                    <Minimap.Item value="details">Details</Minimap.Item>
                </Minimap.Root>
            </Minimap.Provider>
        );

        await user.click(screen.getByRole('button', { name: 'Details' }));
        expect(scrollIntoView).toHaveBeenCalledTimes(1);
        expect(scrollIntoView.mock.contexts[0]).toBe(screen.getByTestId('waypoint'));

        Element.prototype.scrollIntoView = original;
    });

    test('forwards refs on root, item and parts', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const itemRef = React.createRef<HTMLButtonElement>();
        const bubbleRef = React.createRef<HTMLDivElement>();
        render(
            <Minimap.Provider>
                <Minimap.Root ref={rootRef}>
                    <Minimap.Item ref={itemRef} value="0">
                        <Minimap.Track><Minimap.Bubble ref={bubbleRef}>1</Minimap.Bubble></Minimap.Track>
                    </Minimap.Item>
                </Minimap.Root>
            </Minimap.Provider>
        );
        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(itemRef.current).toBeInstanceOf(HTMLButtonElement);
        expect(bubbleRef.current).toBeInstanceOf(HTMLSpanElement);
    });
});

describe('Minimap content model', () => {
    test('parts inside the Item button are phrasing content (no div descendants) and keep their classes', () => {
        render(
            <Minimap.Provider>
                <Minimap.Root>
                    <Minimap.Item value="a" data-testid="item">
                        <Minimap.Track>
                            <Minimap.Bubble>1</Minimap.Bubble>
                            <Minimap.Line />
                        </Minimap.Track>
                        <Minimap.Content>Section A</Minimap.Content>
                    </Minimap.Item>
                </Minimap.Root>
            </Minimap.Provider>
        );
        const item = screen.getByTestId('item');
        expect(item.querySelectorAll('div')).toHaveLength(0);
        const parts = Array.from(item.querySelectorAll('*'));
        expect(parts).toHaveLength(4); // track, bubble, line, content
        parts.forEach((part) => expect(part.tagName).toBe('SPAN'));
    });
});
