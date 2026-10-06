import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggleGroup from '../ToggleGroup';

describe('ToggleGroup item behavior', () => {
    test('consumer onClick does not replace toggling', async() => {
        const user = userEvent.setup();
        const onClick = jest.fn();
        const onValueChange = jest.fn();
        render(
            <ToggleGroup.Root type="multiple" onValueChange={onValueChange}>
                <ToggleGroup.Item value="bold" onClick={onClick}>B</ToggleGroup.Item>
            </ToggleGroup.Root>
        );
        await user.click(screen.getByText('B'));
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenLastCalledWith(['bold']);
        expect(screen.getByText('B')).toHaveAttribute('aria-pressed', 'true');
    });

    test('a bare string value matches whole item values, not substrings', () => {
        render(
            <ToggleGroup.Root type="single" defaultValue="bold">
                <ToggleGroup.Item value="b">short</ToggleGroup.Item>
                <ToggleGroup.Item value="bold">bold</ToggleGroup.Item>
            </ToggleGroup.Root>
        );
        expect(screen.getByText('short')).toHaveAttribute('aria-pressed', 'false');
        expect(screen.getByText('bold')).toHaveAttribute('aria-pressed', 'true');
    });

    test('toggle buttons do not expose aria-selected', () => {
        render(
            <ToggleGroup.Root type="single">
                <ToggleGroup.Item value="a">A</ToggleGroup.Item>
            </ToggleGroup.Root>
        );
        expect(screen.getByText('A')).not.toHaveAttribute('aria-selected');
    });

    test('Space and Enter toggle the focused item', async() => {
        const user = userEvent.setup();
        render(
            <ToggleGroup.Root type="multiple">
                <ToggleGroup.Item value="a">A</ToggleGroup.Item>
                <ToggleGroup.Item value="b">B</ToggleGroup.Item>
            </ToggleGroup.Root>
        );
        await user.tab();
        await user.keyboard(' ');
        expect(screen.getByText('A')).toHaveAttribute('aria-pressed', 'true');
        await user.keyboard('{ArrowRight}{Enter}');
        expect(screen.getByText('B')).toHaveAttribute('aria-pressed', 'true');
    });
});

describe('ToggleGroup asChild', () => {
    test.each([true, false])('renders the child element as the group container (rovingFocus=%s)', async(rovingFocus) => {
        const user = userEvent.setup();
        const ref = React.createRef<HTMLDivElement>();
        render(
            <ToggleGroup.Root asChild type="multiple" aria-label="Formatting" rovingFocus={rovingFocus} ref={ref} className="extra">
                <nav data-testid="container">
                    <ToggleGroup.Item value="bold">B</ToggleGroup.Item>
                    <ToggleGroup.Item value="italic">I</ToggleGroup.Item>
                </nav>
            </ToggleGroup.Root>
        );
        const container = screen.getByTestId('container');
        expect(container.tagName).toBe('NAV');
        expect(container).toHaveClass('extra');
        expect(container).toHaveAttribute('aria-label', 'Formatting');
        expect(ref.current).toBe(container);

        await user.click(screen.getByText('I'));
        expect(screen.getByText('I')).toHaveAttribute('aria-pressed', 'true');
    });
});
