import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '../Checkbox/Checkbox';
import Switch from '../Switch/Switch';
import RadioGroup from '../RadioGroup/RadioGroup';
import Slider from '../Slider/Slider';
import { moveThumb } from '../Slider/utils/sliderMath';

const formData = () => new FormData(document.getElementById('f') as HTMLFormElement);

describe('form attribute, inputRef and uncheckedValue', () => {
    test('Checkbox submits uncheckedValue while unchecked, and its value once checked', async() => {
        const user = userEvent.setup();
        const ref = React.createRef<HTMLInputElement>();
        render(
            <>
                <form id="f" />
                <Checkbox.Root name="terms" value="yes" uncheckedValue="no" form="f" inputRef={ref} aria-label="Terms">
                    <Checkbox.Indicator />
                </Checkbox.Root>
            </>
        );
        expect(ref.current).toHaveAttribute('type', 'checkbox');
        expect(formData().getAll('terms')).toEqual(['no']);
        await user.click(screen.getByRole('checkbox', { name: 'Terms' }));
        expect(formData().getAll('terms')).toEqual(['yes']);
    });

    test('Checkbox indeterminate shows the mixed state', () => {
        render(<Checkbox.Root indeterminate defaultChecked aria-label="All"><Checkbox.Indicator /></Checkbox.Root>);
        expect(screen.getByRole('checkbox', { name: 'All' })).toHaveAttribute('aria-checked', 'mixed');
    });

    test('Switch submits uncheckedValue while off', async() => {
        const user = userEvent.setup();
        render(
            <>
                <form id="f" />
                <Switch.Root name="alerts" uncheckedValue="off" form="f" aria-label="Alerts"><Switch.Thumb /></Switch.Root>
            </>
        );
        expect(formData().getAll('alerts')).toEqual(['off']);
        await user.click(screen.getByRole('switch', { name: 'Alerts' }));
        expect(formData().getAll('alerts')).toEqual(['on']);
    });

    test('RadioGroup submits to a form outside it and resets with it', async() => {
        const user = userEvent.setup();
        const ref = React.createRef<HTMLInputElement>();
        render(
            <>
                <form id="f" />
                <RadioGroup.Root name="plan" defaultValue="one" form="f" inputRef={ref} aria-label="Plan">
                    <RadioGroup.Item value="one">One</RadioGroup.Item>
                    <RadioGroup.Item value="two">Two</RadioGroup.Item>
                </RadioGroup.Root>
            </>
        );
        expect(ref.current).toHaveAttribute('name', 'plan');
        await user.click(screen.getByRole('radio', { name: 'Two' }));
        expect(formData().get('plan')).toBe('two');
        act(() => { (document.getElementById('f') as HTMLFormElement).reset(); });
        await waitFor(() => expect(formData().get('plan')).toBe('one'));
    });
});

describe('Slider thumbs and value text', () => {
    test('moveThumb: none stops, push moves neighbours, swap passes them', () => {
        expect(moveThumb([20, 40], 0, 60, 0, 100, 0, 'none')).toEqual({ values: [40, 40], index: 0 });
        expect(moveThumb([20, 40], 0, 60, 0, 100, 5, 'push')).toEqual({ values: [60, 65], index: 0 });
        expect(moveThumb([20, 40], 0, 60, 0, 100, 0, 'swap')).toEqual({ values: [40, 60], index: 1 });
        expect(moveThumb([20, 40], 0, 100, 0, 100, 5, 'push')).toEqual({ values: [95, 100], index: 0 });
    });

    const Range = (props: Record<string, unknown>) => (
        <Slider.Root defaultValue={[40, 50]} step={5} {...props}>
            <Slider.Track><Slider.Range /></Slider.Track>
            <Slider.Thumb index={0} getAriaLabel={(i) => (i === 0 ? 'Minimum' : 'Maximum')} getAriaValueText={(text, _value, i) => `${text} (${i})`} />
            <Slider.Thumb index={1} getAriaLabel={(i) => (i === 0 ? 'Minimum' : 'Maximum')} />
        </Slider.Root>
    );

    test('getAriaLabel and getAriaValueText', () => {
        render(<Range format={{ style: 'percent' }} min={0} max={1} step={0.1} defaultValue={[0.4, 0.5]} />);
        const min = screen.getByRole('slider', { name: 'Minimum' });
        expect(min).toHaveAttribute('aria-valuetext', '40% (0)');
        expect(screen.getByRole('slider', { name: 'Maximum' })).toHaveAttribute('aria-valuetext', '50%');
    });

    test('push: keys move the neighbour along', () => {
        const onValueChange = jest.fn();
        render(<Range thumbCollisionBehavior="push" onValueChange={onValueChange} />);
        const min = screen.getByRole('slider', { name: 'Minimum' });
        fireEvent.keyDown(min, { key: 'ArrowRight' });
        fireEvent.keyDown(min, { key: 'ArrowRight' });
        expect(onValueChange).toHaveBeenLastCalledWith([50, 50]);
        fireEvent.keyDown(min, { key: 'ArrowRight' });
        expect(onValueChange).toHaveBeenLastCalledWith([55, 55]);
    });

    test('largeStep sets the Page Up jump', () => {
        const onValueChange = jest.fn();
        render(<Range largeStep={25} onValueChange={onValueChange} />);
        fireEvent.keyDown(screen.getByRole('slider', { name: 'Maximum' }), { key: 'PageUp' });
        expect(onValueChange).toHaveBeenLastCalledWith([40, 75]);
    });
});
