import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import TabNav from '../TabNav';

const renderNav = (rootProps: React.ComponentProps<typeof TabNav.Root> = {}) => render(
    <>
        <button>before</button>
        <TabNav.Root aria-label="Sections" {...rootProps}>
            <TabNav.Link value="one" href="#one">One</TabNav.Link>
            <TabNav.Link value="two" href="#two">Two</TabNav.Link>
            <TabNav.Link value="three" href="#three" disabled>Three</TabNav.Link>
        </TabNav.Root>
    </>
);

describe('TabNav regressions', () => {
    test('active link is marked with aria-current and data-state, never aria-selected', () => {
        renderNav({ defaultValue: 'two' });
        const two = screen.getByRole('link', { name: 'Two' });
        expect(two).toHaveAttribute('aria-current', 'page');
        expect(two).toHaveAttribute('data-state', 'active');
        expect(screen.getByRole('link', { name: 'One' })).not.toHaveAttribute('aria-current');
        expect(screen.getByRole('link', { name: 'One' })).toHaveAttribute('data-state', 'inactive');
        screen.getAllByRole('link').forEach((link) => expect(link).not.toHaveAttribute('aria-selected'));
    });

    test('arrow keys move focus without changing the current link; Enter/click activates', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        renderNav({ defaultValue: 'one', onValueChange });
        screen.getByRole('link', { name: 'One' }).focus();
        await user.keyboard('{ArrowRight}');
        expect(screen.getByRole('link', { name: 'Two' })).toHaveFocus();
        expect(screen.getByRole('link', { name: 'One' })).toHaveAttribute('aria-current', 'page');
        expect(onValueChange).not.toHaveBeenCalled();

        await user.click(screen.getByRole('link', { name: 'Two' }));
        expect(onValueChange).toHaveBeenCalledWith('two');
        expect(screen.getByRole('link', { name: 'Two' })).toHaveAttribute('aria-current', 'page');
    });

    test('tabbing into the nav lands on the current link', async() => {
        const user = userEvent.setup();
        renderNav({ defaultValue: 'two' });
        await user.click(screen.getByText('before'));
        await user.tab();
        expect(screen.getByRole('link', { name: 'Two' })).toHaveFocus();
    });

    test('`active` prop overrides value-based selection', () => {
        render(
            <TabNav.Root defaultValue="one">
                <TabNav.Link value="one" href="#one">One</TabNav.Link>
                <TabNav.Link href="#two" active>Two</TabNav.Link>
            </TabNav.Root>
        );
        expect(screen.getByText('Two')).toHaveAttribute('aria-current', 'page');
        expect(screen.getByText('Two')).not.toHaveAttribute('active');
    });

    test('disabled links are skipped and do not activate', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        renderNav({ defaultValue: 'one', onValueChange });
        const disabled = screen.getByText('Three');
        expect(disabled).toHaveAttribute('data-disabled');
        await user.click(disabled);
        expect(onValueChange).not.toHaveBeenCalled();
    });

    test('axe: no violations including the roving wrapper', async() => {
        const { container } = renderNav({ defaultValue: 'one' });
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toEqual([]);
        expect(container.querySelector('[aria-orientation]')).toBeNull();
    });
});

describe('TabNav landmark', () => {
    test('renders a labelled <nav> landmark (no role="group" override) and forwards its ref', async() => {
        const ref = React.createRef<HTMLElement>();
        const { container } = render(
            <TabNav.Root ref={ref} aria-label="Project sections" defaultValue="one">
                <TabNav.Link value="one" href="#one">One</TabNav.Link>
                <TabNav.Link value="two" href="#two">Two</TabNav.Link>
            </TabNav.Root>
        );
        const nav = screen.getByRole('navigation', { name: 'Project sections' });
        expect(nav.tagName).toBe('NAV');
        expect(nav).not.toHaveAttribute('role');
        expect(ref.current).toBe(nav);
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toEqual([]);
    });
});
