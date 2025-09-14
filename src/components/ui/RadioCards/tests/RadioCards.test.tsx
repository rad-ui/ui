import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RadioCards from '../RadioCards';

describe('RadioCards', () => {
    const options = [
        { id: 'config-1', value: '8-core CPU', label: '8-core CPU' },
        { id: 'config-2', value: '16-core CPU', label: '16-core CPU' },
        { id: 'config-3', value: '32-core CPU', label: '32-core CPU' }
    ];

    function renderRadioCards(props = {}) {
        return render(
            <RadioCards.Root name="test-group" {...props}>
                {options.map((option) => (
                    <RadioCards.Item key={option.id} value={option.value} data-testid={`radio-item-${option.value}`}>
                        {option.label}
                    </RadioCards.Item>
                ))}
            </RadioCards.Root>
        );
    }

    it('renders without console warnings', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        renderRadioCards();
        const filteredCalls = warnSpy.mock.calls.filter(([msg]) =>
            !String(msg).includes('asChild prop requires exactly one valid child element')
        );
        expect(filteredCalls).toHaveLength(0);
        warnSpy.mockRestore();
    });

    it('renders all radio items with correct labels', () => {
        renderRadioCards();
        options.forEach((option) => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });

    it('selects an item when clicked and only one is selected at a time', () => {
        renderRadioCards();
        const first = screen.getByTestId('radio-item-8-core CPU');
        const second = screen.getByTestId('radio-item-16-core CPU');
        const third = screen.getByTestId('radio-item-32-core CPU');

        // Initially none selected
        expect(first).toHaveAttribute('aria-checked', 'false');
        expect(second).toHaveAttribute('aria-checked', 'false');
        expect(third).toHaveAttribute('aria-checked', 'false');

        // Click first
        fireEvent.click(first);
        expect(first).toHaveAttribute('aria-checked', 'true');
        expect(second).toHaveAttribute('aria-checked', 'false');
        expect(third).toHaveAttribute('aria-checked', 'false');

        // Click second
        fireEvent.click(second);
        expect(first).toHaveAttribute('aria-checked', 'false');
        expect(second).toHaveAttribute('aria-checked', 'true');
        expect(third).toHaveAttribute('aria-checked', 'false');
    });

    it('supports defaultValue prop', () => {
        renderRadioCards({ defaultValue: '16-core CPU' });
        const second = screen.getByTestId('radio-item-16-core CPU');
        expect(second).toHaveAttribute('aria-checked', 'true');
    });

    it('calls onValueChange when selection changes', () => {
        const handleChange = jest.fn();
        renderRadioCards({ onValueChange: handleChange });
        const third = screen.getByTestId('radio-item-32-core CPU');
        fireEvent.click(third);
        expect(handleChange).toHaveBeenCalledWith('32-core CPU');
    });

    it('applies disabled prop to all items', () => {
        renderRadioCards({ disabled: true });
        options.forEach((option) => {
            const item = screen.getByTestId(`radio-item-${option.value}`);
            expect(item).toHaveAttribute('aria-disabled', 'true');
        });
    });

    it('applies custom className to root', () => {
        const { container } = renderRadioCards({ className: 'custom-root' });
        expect(container.firstChild).toHaveClass('custom-root');
    });

    it('forwards refs to root and item', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const itemRef = React.createRef<HTMLButtonElement>();

        render(
            <RadioCards.Root ref={rootRef} name="group" defaultValue={options[0].value}>
                <RadioCards.Item ref={itemRef} value={options[0].value}>
                    {options[0].label}
                </RadioCards.Item>
            </RadioCards.Root>
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(itemRef.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('renders hidden radio input for form submission', () => {
        const { container } = renderRadioCards({ defaultValue: options[0].value, name: 'test-group' });
        const input = container.querySelector('input[type="hidden"]') as HTMLInputElement | null;
        expect(input).toBeInTheDocument();
        expect(input?.value).toBe(options[0].value);
    });
});
