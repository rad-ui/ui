import React from 'react';
import { render, screen } from '@testing-library/react';
import Kbd from '../Kbd';

describe('Kbd', () => {
    test('Kbd renders children correctly', () => {
        render(<Kbd>Ctrl</Kbd>);
        expect(screen.getByText('Ctrl')).toBeInTheDocument();
    });

    test('Kbd applies className correctly', () => {
        render(<Kbd className="additional-class">Ctrl</Kbd>);
        const kbdElement = screen.getByText('Ctrl');
        expect(kbdElement).toHaveClass('additional-class');
    });

    test('Kbd spreads additional props correctly', () => {
        render(<Kbd data-testid="kbd-element">Ctrl</Kbd>);
        const kbdElement = screen.getByTestId('kbd-element');
        expect(kbdElement).toBeInTheDocument();
        expect(kbdElement).not.toHaveAttribute('aria-hidden');
    });

    test('forwards ref to kbd element', () => {
        const ref = React.createRef<HTMLElement>();
        render(<Kbd ref={ref}>Ctrl</Kbd>);
        expect(ref.current).not.toBeNull();
        expect(ref.current?.tagName).toBe('KBD');
    });

    test('renders without console warnings', () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        render(<Kbd>Ctrl</Kbd>);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(warnSpy).not.toHaveBeenCalled();
        errorSpy.mockRestore();
        warnSpy.mockRestore();
    });
});
