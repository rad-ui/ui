import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Slider from '../Slider';

describe('Slider.Value', () => {
    test('shows the formatted value and follows changes', () => {
        render(
            <Slider.Root defaultValue={40} formatValue={(value) => `${value}%`} aria-label="Volume">
                <Slider.Value data-testid="value" />
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb aria-label="Volume" />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        expect(screen.getByTestId('value')).toHaveTextContent('40%');
        expect(screen.getByTestId('value').tagName).toBe('OUTPUT');
        fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
        expect(screen.getByTestId('value')).toHaveTextContent('41%');
    });

    test('accepts a render function', () => {
        render(
            <Slider.Root defaultValue={3} min={0} max={10} aria-label="Rating">
                <Slider.Value>{(_formatted, values) => `${values[0]} of 10`}</Slider.Value>
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb aria-label="Rating" />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        expect(screen.getByText('3 of 10')).toBeInTheDocument();
    });
});
