import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Slider from '../Slider';

describe('Slider controlled/uncontrolled mode switching', () => {
    test('switches from uncontrolled to controlled', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();

        const { rerender } = render(
            <Slider.Root defaultValue={50} min={0} max={100} step={10}>
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );

        const thumb = screen.getByRole('slider');
        thumb.focus();
        await user.keyboard('{ArrowRight}');
        expect(thumb).toHaveAttribute('aria-valuenow', '60');

        rerender(
            <Slider.Root value={50} min={0} max={100} step={10} onValueChange={onValueChange}>
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );

        expect(thumb).toHaveAttribute('aria-valuenow', '50');
        await user.keyboard('{ArrowRight}');
        expect(onValueChange).toHaveBeenCalledWith(60);
    });

    test('switches from controlled to uncontrolled', async() => {
        const user = userEvent.setup();

        const sliderTree = (props: Partial<React.ComponentProps<typeof Slider.Root>>) => (
            <Slider.Root min={0} max={100} step={10} {...props}>
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );

        const { rerender } = render(sliderTree({ defaultValue: 20 }));

        rerender(sliderTree({ value: 80, onValueChange: () => {} }));
        expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '80');

        rerender(sliderTree({ defaultValue: 20 }));

        const thumb = screen.getByRole('slider');
        expect(thumb).toHaveAttribute('aria-valuenow', '20');
        thumb.focus();
        await user.keyboard('{ArrowRight}');
        await waitFor(() => {
            expect(thumb).toHaveAttribute('aria-valuenow', '30');
        });
    });
});
