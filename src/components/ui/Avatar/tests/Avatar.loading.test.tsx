import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Avatar from '../Avatar';

const renderAvatar = (src: string, imageProps: Record<string, unknown> = {}) => (
    <Avatar.Root customRootClass="rad-ui" color="blue" data-testid="root">
        <Avatar.Image src={src} alt="avatar" {...imageProps} />
        <Avatar.Fallback>RU</Avatar.Fallback>
    </Avatar.Root>
);

describe('Avatar image loading lifecycle', () => {
    test('image is marked loading and the fallback stays visible until load', () => {
        render(renderAvatar('a.png'));
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('data-state', 'loading');
        expect(screen.getByText('RU')).toBeInTheDocument();

        fireEvent.load(image);
        expect(screen.getByRole('img')).toHaveAttribute('data-state', 'loaded');
        expect(screen.queryByText('RU')).not.toBeInTheDocument();
    });

    test('a broken image shows the fallback and stops styling it as an image placeholder', () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(renderAvatar('broken.png'));
        expect(screen.getByTestId('root')).toHaveAttribute('data-rad-ui-has-image');

        fireEvent.error(screen.getByRole('img'));

        expect(screen.queryByRole('img')).not.toBeInTheDocument();
        expect(screen.getByText('RU')).toBeInTheDocument();
        // The fallback is now the final content, so accent color styling applies.
        expect(screen.getByTestId('root')).not.toHaveAttribute('data-rad-ui-has-image');
        expect(errorSpy).not.toHaveBeenCalled();
        errorSpy.mockRestore();
    });

    test('changing src after an error renders the new image again', () => {
        const { rerender } = render(renderAvatar('broken.png'));
        fireEvent.error(screen.getByRole('img'));
        expect(screen.queryByRole('img')).not.toBeInTheDocument();

        rerender(renderAvatar('good.png'));
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', 'good.png');
        expect(image).toHaveAttribute('data-state', 'loading');

        fireEvent.load(image);
        expect(screen.queryByText('RU')).not.toBeInTheDocument();
    });

    test('changing src after a load shows the fallback until the new image loads', () => {
        const { rerender } = render(renderAvatar('one.png'));
        fireEvent.load(screen.getByRole('img'));
        expect(screen.queryByText('RU')).not.toBeInTheDocument();

        rerender(renderAvatar('two.png'));
        expect(screen.getByRole('img')).toHaveAttribute('data-state', 'loading');
        expect(screen.getByText('RU')).toBeInTheDocument();
    });

    test('an image that finished loading before hydration is detected as loaded', () => {
        const completeSpy = jest.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true);
        const widthSpy = jest.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(64);

        render(renderAvatar('cached.png'));

        expect(screen.getByRole('img')).toHaveAttribute('data-state', 'loaded');
        expect(screen.queryByText('RU')).not.toBeInTheDocument();
        completeSpy.mockRestore();
        widthSpy.mockRestore();
    });

    test('an image that failed before hydration falls back', async() => {
        const completeSpy = jest.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true);
        const widthSpy = jest.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(0);
        const original = (HTMLImageElement.prototype as any).decode;
        (HTMLImageElement.prototype as any).decode = () => Promise.reject(new Error('broken'));

        render(renderAvatar('failed.png'));
        await act(async() => { await Promise.resolve(); });

        expect(screen.queryByRole('img')).not.toBeInTheDocument();
        expect(screen.getByText('RU')).toBeInTheDocument();
        (HTMLImageElement.prototype as any).decode = original;
        completeSpy.mockRestore();
        widthSpy.mockRestore();
    });

    test('consumer onLoad/onError handlers do not replace the internal handlers', () => {
        const onLoad = jest.fn();
        const onError = jest.fn();
        const { rerender } = render(renderAvatar('a.png', { onLoad, onError }));

        fireEvent.load(screen.getByRole('img'));
        expect(onLoad).toHaveBeenCalledTimes(1);
        expect(screen.queryByText('RU')).not.toBeInTheDocument();

        rerender(renderAvatar('b.png', { onLoad, onError }));
        fireEvent.error(screen.getByRole('img'));
        expect(onError).toHaveBeenCalledTimes(1);
        expect(screen.getByText('RU')).toBeInTheDocument();
    });

    test('an empty src renders the fallback only', () => {
        render(renderAvatar(''));
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
        expect(screen.getByText('RU')).toBeInTheDocument();
    });
});
