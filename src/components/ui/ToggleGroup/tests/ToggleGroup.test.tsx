import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ToggleGroup from '../ToggleGroup';

describe('ToggleGroup ref forwarding', () => {
    test('forwards ref in ToggleGroup.Root', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <ToggleGroup.Root ref={ref}>
                <ToggleGroup.Item value="item1">Item 1</ToggleGroup.Item>
            </ToggleGroup.Root>
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    test('forwards ref in ToggleGroup.Item', () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(
            <ToggleGroup.Root>
                <ToggleGroup.Item ref={ref} value="item1">Item 1</ToggleGroup.Item>
            </ToggleGroup.Root>
        );
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    test('renders without warnings', () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        render(
            <ToggleGroup.Root>
                <ToggleGroup.Item value="item1">Item 1</ToggleGroup.Item>
            </ToggleGroup.Root>
        );
        expect(errorSpy).not.toHaveBeenCalled();
        expect(warnSpy).not.toHaveBeenCalled();
        errorSpy.mockRestore();
        warnSpy.mockRestore();
    });

    test('maintains aria-pressed attribute for accessibility', () => {
        render(
            <ToggleGroup.Root>
                <ToggleGroup.Item value="item1">Item 1</ToggleGroup.Item>
            </ToggleGroup.Root>
        );
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-pressed', 'false');
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-pressed', 'true');
    });
});
