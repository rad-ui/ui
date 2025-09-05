import React from 'react';
import { render, screen } from '@testing-library/react';
import Slider from '../Slider';

describe('Slider Component', () => {
    test('Slider.Root forwards ref', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <Slider.Root ref={ref}>
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    test('Slider.Track forwards ref', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <Slider.Root>
                <Slider.Track ref={ref}>
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    test('Slider.Range forwards ref', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <Slider.Root>
                <Slider.Track>
                    <Slider.Range ref={ref}>
                        <Slider.Thumb />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    test('Slider.Thumb forwards ref', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <Slider.Root>
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb ref={ref} />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    test('hidden input is present for accessibility', () => {
        render(
            <Slider.Root defaultValue={50}>
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        const hiddenInput = screen.getByRole('textbox', { hidden: true });
        expect(hiddenInput).toHaveValue('50');
    });

    test('renders without warnings', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        render(
            <Slider.Root>
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        expect(warnSpy).not.toHaveBeenCalled();
        warnSpy.mockRestore();
    });

    test('matches snapshot', () => {
        const { asFragment } = render(
            <Slider.Root defaultValue={25}>
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
