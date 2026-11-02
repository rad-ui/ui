import React from 'react';
import { act, render, screen } from '@testing-library/react';
import usePresence from './usePresence';

type FakeAnimation = { finished: Promise<void>; finish: () => void; playState: string; effect: { getComputedTiming: () => { iterations: number } } };

const fakeAnimation = (iterations = 1): FakeAnimation => {
    let finish = () => {};
    const finished = new Promise<void>((resolve) => { finish = resolve; });
    return { finished, finish, playState: 'running', effect: { getComputedTiming: () => ({ iterations }) } };
};

let animations: FakeAnimation[] = [];

const Part = ({ open }: { open: boolean }) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const setRef = React.useCallback((node: HTMLDivElement | null) => {
        ref.current = node;
        if (node) {
            (node as unknown as { getAnimations: () => FakeAnimation[] }).getAnimations = () => animations;
        }
    }, []);
    const present = usePresence(open, ref);
    return present ? <div ref={setRef} data-testid="part" data-state={open ? 'open' : 'closed'} /> : null;
};

describe('usePresence', () => {
    beforeEach(() => {
        animations = [];
    });

    test('unmounts straight away when nothing animates', () => {
        const { rerender } = render(<Part open />);
        rerender(<Part open={false} />);
        expect(screen.queryByTestId('part')).toBeNull();
    });

    test('stays mounted in the closed state until the exit animation finishes', async() => {
        const { rerender } = render(<Part open />);
        const exit = fakeAnimation();
        animations = [exit];
        rerender(<Part open={false} />);
        expect(screen.getByTestId('part')).toHaveAttribute('data-state', 'closed');

        await act(async() => {
            exit.finish();
            await exit.finished;
        });
        expect(screen.queryByTestId('part')).toBeNull();
    });

    test('reopening during the exit keeps it mounted and open', async() => {
        const { rerender } = render(<Part open />);
        const exit = fakeAnimation();
        animations = [exit];
        rerender(<Part open={false} />);
        animations = [];
        rerender(<Part open />);

        await act(async() => {
            exit.finish();
            await exit.finished;
        });
        expect(screen.getByTestId('part')).toHaveAttribute('data-state', 'open');
    });

    test('ignores infinite animations, which never finish', () => {
        const { rerender } = render(<Part open />);
        animations = [fakeAnimation(Infinity)];
        rerender(<Part open={false} />);
        expect(screen.queryByTestId('part')).toBeNull();
    });

    test('unmounts straight away when the user prefers reduced motion', () => {
        const original = window.matchMedia;
        window.matchMedia = ((query: string) => ({ matches: query.includes('reduce'), media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
        try {
            const { rerender } = render(<Part open />);
            animations = [fakeAnimation()];
            rerender(<Part open={false} />);
            expect(screen.queryByTestId('part')).toBeNull();
        } finally {
            window.matchMedia = original;
        }
    });
});
