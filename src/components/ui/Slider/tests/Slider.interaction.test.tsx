import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';
import Slider from '../Slider';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';

// Polyfill PointerEvent for jsdom
// @ts-ignore
if (typeof window !== 'undefined' && !window.PointerEvent) window.PointerEvent = MouseEvent;

describe('Slider interactions', () => {
    test('keyboard controls and data-state reflect activity', async() => {
        const user = userEvent.setup();
        render(
            <Slider.Root defaultValue={50} step={10} min={0} max={100}>
                <Slider.Track data-testid="track">
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        const thumb = screen.getByRole('slider');
        thumb.focus();
        expect(thumb).toHaveAttribute('aria-valuenow', '50');
        await user.keyboard('{ArrowRight}');
        expect(thumb).toHaveAttribute('aria-valuenow', '60');
        expect(thumb).toHaveAttribute('data-state', 'active');
        await user.keyboard('{ArrowLeft}');
        expect(thumb).toHaveAttribute('aria-valuenow', '50');
        await user.keyboard('{Home}');
        expect(thumb).toHaveAttribute('aria-valuenow', '0');
        await user.keyboard('{End}');
        expect(thumb).toHaveAttribute('aria-valuenow', '100');
    });

    test('pointer drag updates value and data-state', () => {
        render(
            <Slider.Root defaultValue={0} min={0} max={100} data-testid="root">
                <Slider.Track style={{ width: '100px' }}>
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        const thumb = screen.getByRole('slider');
        const root = screen.getByTestId('root');
        root.getBoundingClientRect = () => ({ left: 0, width: 100, top: 0, height: 10, right: 100, bottom: 10, x: 0, y: 0, toJSON: () => {} });
        fireEvent.pointerDown(root, { clientX: 30 });
        expect(thumb).toHaveAttribute('aria-valuenow', '30');
        expect(thumb).toHaveAttribute('data-state', 'dragging');
        fireEvent.pointerMove(root, { clientX: 70 });
        expect(thumb).toHaveAttribute('aria-valuenow', '70');
        fireEvent.pointerUp(root, { clientX: 70 });
        expect(thumb).toHaveAttribute('data-state', 'active');
    });

    test('controlled and uncontrolled values stay in sync', async() => {
        const user = userEvent.setup();
        const Controlled = () => {
            const [value, setValue] = React.useState(40);
            return (
                <>
                    <div data-testid="value">{value}</div>
                    <Slider.Root value={value} onValueChange={(v: number | number[]) => setValue(v as number)} step={1}>
                        <Slider.Track>
                            <Slider.Range>
                                <Slider.Thumb />
                            </Slider.Range>
                        </Slider.Track>
                    </Slider.Root>
                </>
            );
        };
        const { rerender } = render(<Controlled />);
        const thumb = screen.getByRole('slider');
        thumb.focus();
        await user.keyboard('{ArrowRight}');
        expect(screen.getByTestId('value')).toHaveTextContent('41');

        // uncontrolled
        rerender(
            <Slider.Root defaultValue={20} step={1}>
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        const thumb2 = screen.getByRole('slider');
        thumb2.focus();
        await user.keyboard('{ArrowRight}');
        expect(thumb2).toHaveAttribute('aria-valuenow', '21');
    });

    test('form submission includes slider value', async() => {
        const user = userEvent.setup();
        const handleSubmit = jest.fn((e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            expect(data.get('volume')).toBe('75');
        });
        render(
            <form onSubmit={handleSubmit}>
                <Slider.Root name="volume" defaultValue={75}>
                    <Slider.Track>
                        <Slider.Range>
                            <Slider.Thumb />
                        </Slider.Range>
                    </Slider.Track>
                </Slider.Root>
                <button type="submit">Submit</button>
            </form>
        );
        await user.click(screen.getByText('Submit'));
        expect(handleSubmit).toHaveBeenCalled();
    });

    test('axe: no violations and proper aria attributes', async() => {
        const { container } = render(
            <Slider.Root defaultValue={30} min={0} max={100}>
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
        const thumb = screen.getByRole('slider');
        expect(thumb).toHaveAttribute('aria-valuemin', '0');
        expect(thumb).toHaveAttribute('aria-valuemax', '100');
        expect(thumb).toHaveAttribute('aria-valuenow', '30');
    });

    test('rtl direction reverses arrow controls', async() => {
        const user = userEvent.setup();
        render(
            <div dir="rtl">
                <Slider.Root defaultValue={10} step={1}>
                    <Slider.Track>
                        <Slider.Range>
                            <Slider.Thumb />
                        </Slider.Range>
                    </Slider.Track>
                </Slider.Root>
            </div>
        );
        const thumb = screen.getByRole('slider');
        thumb.focus();
        await user.keyboard('{ArrowRight}');
        expect(thumb).toHaveAttribute('aria-valuenow', '9');
        await user.keyboard('{ArrowLeft}');
        expect(thumb).toHaveAttribute('aria-valuenow', '10');
    });

    test('asChild thumb preserves semantics and refs', () => {
        const ref = React.createRef<HTMLSpanElement>();
        const Custom = React.forwardRef<HTMLSpanElement>((props, fref) => (
            <span data-testid="custom" {...props} ref={fref} />
        ));
        Custom.displayName = 'Custom';
        render(
            <Slider.Root defaultValue={0}>
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb asChild ref={ref}>
                            <Custom />
                        </Slider.Thumb>
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        const custom = screen.getByTestId('custom');
        expect(custom).toHaveAttribute('role', 'slider');
        expect(ref.current).toBe(custom);
    });
});
