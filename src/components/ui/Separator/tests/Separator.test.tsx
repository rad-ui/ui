import React from 'react';
import { render, screen } from '@testing-library/react';
import Separator from '../Separator';

describe('Separator Component', () => {
    test('renders Separator component with className', () => {
        render(<Separator data-testid="separator" className="border-t border-gray-200" />);
        expect(screen.getByTestId('separator')).toHaveClass('border-t border-gray-200');
    });

    test('renders Separator component with custom style', () => {
        render(<Separator data-testid="separator" style={{ color: 'red' }} />);
        expect(screen.getByTestId('separator')).toHaveStyle('color: red');
    });

    test('renders Separator component with custom id', () => {
        render(<Separator data-testid="separator" id="separator-id" />);
        expect(screen.getByTestId('separator')).toHaveAttribute('id', 'separator-id');
    });

    test('renders Separator component with custom data attribute', () => {
        render(<Separator data-testid="separator" data-custom="separator-data" />);
        expect(screen.getByTestId('separator')).toHaveAttribute('data-custom', 'separator-data');
    });

    test('renders Separator component with color', () => {
        render(<Separator color='blue' data-testid="separator"/>);
        expect(screen.getByTestId('separator')).toHaveAttribute('data-rad-ui-accent-color', 'blue');
    });

    test('forwards ref to underlying DOM element', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Separator ref={ref} data-testid="separator" />);
        expect(ref.current).toBe(screen.getByTestId('separator'));
    });

    test('renders without console warnings', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(<Separator data-testid="separator" />);
        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        warnSpy.mockRestore();
        errorSpy.mockRestore();
    });

    test('non-decorative separator is accessible to screen readers', () => {
        render(<Separator data-testid="separator" />);
        const separator = screen.getByTestId('separator');
        expect(separator).not.toHaveAttribute('aria-hidden');
        expect(separator).not.toHaveAttribute('role');
    });

    // New tests for the GitHub issue #1269 features
    describe('New Props and Features', () => {
        test('asChild prop works correctly', () => {
            render(
                <Separator asChild>
                    <hr data-testid="custom-separator" />
                </Separator>
            );
            expect(screen.getByTestId('custom-separator')).toBeInTheDocument();
        });

        test('decorative prop adds proper ARIA attributes', () => {
            render(<Separator decorative data-testid="separator" />);
            const separator = screen.getByTestId('separator');
            expect(separator).toHaveAttribute('role', 'separator');
            expect(separator).toHaveAttribute('aria-hidden', 'true');
        });

        test('data-orientation attribute is set correctly', () => {
            render(<Separator orientation="vertical" data-testid="separator" />);
            expect(screen.getByTestId('separator')).toHaveAttribute('data-orientation', 'vertical');
        });

        test('data-orientation defaults to horizontal', () => {
            render(<Separator data-testid="separator" />);
            expect(screen.getByTestId('separator')).toHaveAttribute('data-orientation', 'horizontal');
        });

        test('decorative and orientation work together', () => {
            render(<Separator decorative orientation="vertical" data-testid="separator" />);
            const separator = screen.getByTestId('separator');
            expect(separator).toHaveAttribute('role', 'separator');
            expect(separator).toHaveAttribute('aria-hidden', 'true');
            expect(separator).toHaveAttribute('data-orientation', 'vertical');
        });

        test('asChild preserves custom element attributes', () => {
            render(
                <Separator asChild>
                    <hr data-testid="custom-separator" className="custom-class" />
                </Separator>
            );
            const customSeparator = screen.getByTestId('custom-separator');
            expect(customSeparator).toHaveClass('custom-class');
        });
    });
});
