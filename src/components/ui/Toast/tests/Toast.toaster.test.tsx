import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import Toast, { Toaster, ToastState, toast } from '../Toast';

describe('Toaster convenience wrapper', () => {
    afterEach(() => {
        ToastState.dismissAll();
    });

    test('is exposed on the Toast namespace', () => {
        expect(Toast.Toaster).toBe(Toaster);
    });

    test('renders queued toasts by default', async() => {
        render(<Toaster closeButton />);

        act(() => {
            toast.success('Saved', { description: 'Your changes were saved.' });
        });

        await waitFor(() => expect(screen.getByText('Saved')).toBeInTheDocument());
        expect(screen.getByText('Your changes were saved.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Close notification' })).toBeInTheDocument();
    });

    test('forwards viewport and container props', () => {
        render(
            <Toaster
                className="viewport-class"
                style={{ outlineOffset: '4px' }}
                containerClassName="container-class"
                containerStyle={{ pointerEvents: 'none' }}
                containerAriaLabel="Alerts"
                offset={24}
                theme="dark"
                richColors
                invert
            />
        );

        const viewport = screen.getByRole('region', { name: 'Alerts' });
        expect(viewport).toHaveClass('viewport-class');
        expect(viewport).toHaveStyle({
            outlineOffset: '4px'
        });
        expect(viewport).toHaveAttribute('data-theme', 'dark');
        expect(viewport).toHaveAttribute('data-rich-colors');
        expect(viewport).toHaveAttribute('data-invert');
        expect(viewport.style.getPropertyValue('--toast-offset')).toBe('24px');
        expect(viewport.parentElement).toHaveClass('container-class');
        expect(viewport.parentElement).toHaveStyle({ pointerEvents: 'none' });
    });
});
