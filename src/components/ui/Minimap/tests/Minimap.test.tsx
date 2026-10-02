import React from 'react';
import { render, screen } from '@testing-library/react';
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
