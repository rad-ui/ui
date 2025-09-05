import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TabNav from '../TabNav';

describe('TabNav', () => {
    it('renders TabNav components correctly', () => {
        render(
            <TabNav.Root>
                <TabNav.Link value="tab1">Tab 1</TabNav.Link>
                <TabNav.Link value="tab2">Tab 2</TabNav.Link>
                <TabNav.Link value="tab3">Tab 3</TabNav.Link>
            </TabNav.Root>
        );

        expect(screen.getByText('Tab 1')).toBeInTheDocument();
        expect(screen.getByText('Tab 2')).toBeInTheDocument();
        expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('handles tab selection correctly', () => {
        const handleValueChange = jest.fn();
        render(
            <TabNav.Root onValueChange={handleValueChange}>
                <TabNav.Link value="tab1">Tab 1</TabNav.Link>
                <TabNav.Link value="tab2">Tab 2</TabNav.Link>
            </TabNav.Root>
        );

        const tab2 = screen.getByText('Tab 2');
        fireEvent.focus(tab2);
        expect(handleValueChange).toHaveBeenCalledWith('tab2');
    });

    it('respects disabled state', () => {
        render(
            <TabNav.Root>
                <TabNav.Link value="tab1" disabled>Tab 1</TabNav.Link>
                <TabNav.Link value="tab2">Tab 2</TabNav.Link>
            </TabNav.Root>
        );

        const disabledTab = screen.getByText('Tab 1');
        expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
        expect(disabledTab).not.toHaveAttribute('href');
    });

    it('applies custom class names', () => {
        const customClass = 'custom-class';
        render(
            <TabNav.Root customRootClass={customClass}>
                <TabNav.Link value="tab1">Tab 1</TabNav.Link>
            </TabNav.Root>
        );

        // Debug: show the rendered HTML
        screen.debug();

        // Try to find the element with the custom class
        const root = screen.getByText('Tab 1').closest(`.${customClass}-tab-nav`);
        expect(root).toHaveClass(`${customClass}-tab-nav`);
    });

    it('works in controlled mode', () => {
        const handleValueChange = jest.fn();
        render(
            <TabNav.Root value="tab2" onValueChange={handleValueChange}>
                <TabNav.Link value="tab1">Tab 1</TabNav.Link>
                <TabNav.Link value="tab2">Tab 2</TabNav.Link>
            </TabNav.Root>
        );

        const tab2 = screen.getByText('Tab 2');
        expect(tab2).toHaveAttribute('aria-selected', 'true');

        const tab1 = screen.getByText('Tab 1');
        fireEvent.focus(tab1);
        expect(handleValueChange).toHaveBeenCalledWith('tab1');
    });

    it('works in uncontrolled mode with defaultValue', () => {
        render(
            <TabNav.Root defaultValue="tab2">
                <TabNav.Link value="tab1">Tab 1</TabNav.Link>
                <TabNav.Link value="tab2">Tab 2</TabNav.Link>
            </TabNav.Root>
        );

        expect(screen.getByText('Tab 2')).toHaveAttribute('aria-selected', 'true');
    });

    it('forwards ref to link', () => {
        const ref = React.createRef<HTMLAnchorElement>();
        render(
            <TabNav.Root>
                <TabNav.Link ref={ref} value="tab1">Tab 1</TabNav.Link>
            </TabNav.Root>
        );

        expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
});
