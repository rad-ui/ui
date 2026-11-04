import React from 'react';
import { render } from '@testing-library/react';
import Checkbox from '../Checkbox';

// #2299: children replace the default mark, className lands on the indicator element,
// and the default icon has no fixed pixel size.

const indicator = (container: HTMLElement) => container.querySelector<HTMLElement>('[data-slot="checkbox-indicator"]')!;

describe('Checkbox.Indicator', () => {
    test('children replace the default icon', () => {
        const { container } = render(
            <Checkbox.Root defaultChecked aria-label="Terms">
                <Checkbox.Indicator><svg data-testid="mine" /></Checkbox.Indicator>
            </Checkbox.Root>
        );
        const el = indicator(container);
        expect(el.querySelectorAll('svg')).toHaveLength(1);
        expect(el.querySelector('[data-testid="mine"]')).not.toBeNull();
    });

    test('className goes on the indicator element', () => {
        const { container } = render(
            <Checkbox.Root defaultChecked aria-label="Terms"><Checkbox.Indicator className="mark" /></Checkbox.Root>
        );
        expect(indicator(container)).toHaveClass('mark');
        expect(indicator(container).querySelector('svg')).not.toHaveClass('mark');
    });

    test('the default icon is sized in em, not pixels, and hidden from assistive tech', () => {
        const { container } = render(
            <Checkbox.Root defaultChecked aria-label="Terms"><Checkbox.Indicator /></Checkbox.Root>
        );
        const svg = indicator(container).querySelector('svg')!;
        expect(svg).toHaveAttribute('width', '1em');
        expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
});
