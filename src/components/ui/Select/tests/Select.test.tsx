import React from 'react';
import { render } from '@testing-library/react';
import Select from '../Select';

describe('Select Component', () => {
    test('forwards ref in Select.Root', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <Select.Root ref={ref}>
                <Select.Trigger>Trigger</Select.Trigger>
            </Select.Root>
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    test('forwards ref in Select.Trigger', () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(
            <Select.Root>
                <Select.Trigger ref={ref}>Trigger</Select.Trigger>
            </Select.Root>
        );
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    test('renders hidden native select for accessibility inside forms', () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const { container } = render(
            <form>
                <Select.Root name="test">
                    <Select.Trigger>Trigger</Select.Trigger>
                    <Select.Content>
                        <Select.Item value="one">One</Select.Item>
                    </Select.Content>
                </Select.Root>
            </form>
        );
        const hiddenSelect = container.querySelector('select[aria-hidden="true"]');
        expect(hiddenSelect).toBeInTheDocument();
        errorSpy.mockRestore();
    });

    test('renders without warnings', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(
            <Select.Root>
                <Select.Trigger>Trigger</Select.Trigger>
            </Select.Root>
        );
        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        warnSpy.mockRestore();
        errorSpy.mockRestore();
    });

    test('matches snapshot', () => {
        const { asFragment } = render(
            <Select.Root>
                <Select.Trigger>Trigger</Select.Trigger>
            </Select.Root>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
