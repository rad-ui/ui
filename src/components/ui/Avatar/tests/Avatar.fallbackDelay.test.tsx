import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Avatar from '../Avatar';

describe('Avatar.Fallback delay', () => {
    beforeEach(() => { jest.useFakeTimers(); });
    afterEach(() => { jest.useRealTimers(); });

    test('waits before showing the fallback', () => {
        render(
            <Avatar.Root>
                <Avatar.Image src="https://example.com/a.png" alt="Ada" />
                <Avatar.Fallback delay={600}>AL</Avatar.Fallback>
            </Avatar.Root>
        );
        expect(screen.queryByText('AL')).not.toBeInTheDocument();
        act(() => { jest.advanceTimersByTime(650); });
        expect(screen.getByText('AL')).toBeInTheDocument();
    });

    test('shows at once without a delay', () => {
        render(
            <Avatar.Root>
                <Avatar.Fallback>AL</Avatar.Fallback>
            </Avatar.Root>
        );
        expect(screen.getByText('AL')).toBeInTheDocument();
    });
});
