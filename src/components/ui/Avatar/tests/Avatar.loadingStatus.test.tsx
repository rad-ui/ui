import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Avatar from '../Avatar';

const renderAvatar = (src: string, onLoadingStatusChange: jest.Mock) => (
    <Avatar.Root>
        <Avatar.Image src={src} alt="avatar" onLoadingStatusChange={onLoadingStatusChange} />
        <Avatar.Fallback>RU</Avatar.Fallback>
    </Avatar.Root>
);

describe('Avatar.Image onLoadingStatusChange', () => {
    test('reports loading, then loaded', () => {
        const onLoadingStatusChange = jest.fn();
        render(renderAvatar('a.png', onLoadingStatusChange));
        expect(onLoadingStatusChange).toHaveBeenLastCalledWith('loading');
        fireEvent.load(screen.getByRole('img'));
        expect(onLoadingStatusChange).toHaveBeenLastCalledWith('loaded');
        expect(onLoadingStatusChange.mock.calls.map(([status]) => status)).toEqual(['loading', 'loaded']);
    });

    test('reports error for a broken image and loading again for a new src', () => {
        const onLoadingStatusChange = jest.fn();
        const { rerender } = render(renderAvatar('broken.png', onLoadingStatusChange));
        fireEvent.error(screen.getByRole('img'));
        expect(onLoadingStatusChange).toHaveBeenLastCalledWith('error');
        rerender(renderAvatar('ok.png', onLoadingStatusChange));
        expect(onLoadingStatusChange).toHaveBeenLastCalledWith('loading');
    });

    test('a missing src is an error', () => {
        const onLoadingStatusChange = jest.fn();
        render(renderAvatar('', onLoadingStatusChange));
        expect(onLoadingStatusChange).toHaveBeenLastCalledWith('error');
    });
});
