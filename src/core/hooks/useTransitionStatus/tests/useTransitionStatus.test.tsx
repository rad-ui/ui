import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useTransitionStatus, getTransitionAttributes } from '../index';

const Popup = ({ open, animations = [], onComplete }: { open: boolean; animations?: Array<{ finished: Promise<unknown>; playState?: string; effect?: unknown }>; onComplete?: (open: boolean) => void }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const { mounted, status } = useTransitionStatus(open, () => {
        if (ref.current) (ref.current as unknown as { getAnimations: () => unknown[] }).getAnimations = () => animations;
        return ref.current;
    }, onComplete);
    return mounted ? <div ref={ref} data-testid="popup" {...getTransitionAttributes(status)} /> : null;
};

describe('useTransitionStatus', () => {
    test('starts open without a starting frame', () => {
        render(<Popup open />);
        expect(screen.getByTestId('popup')).not.toHaveAttribute('data-starting-style');
    });

    test('opening renders a starting frame, then clears it', async() => {
        const { rerender } = render(<Popup open={false} />);
        expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
        rerender(<Popup open />);
        expect(screen.getByTestId('popup')).toHaveAttribute('data-starting-style');
        await act(async() => { await new Promise((resolve) => requestAnimationFrame(() => resolve(null))); });
        expect(screen.getByTestId('popup')).not.toHaveAttribute('data-starting-style');
    });

    test('closing without animations unmounts at once', () => {
        const { rerender } = render(<Popup open />);
        rerender(<Popup open={false} />);
        expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
    });

    test('closing stays mounted with data-ending-style until animations finish', async() => {
        let finish: (value?: unknown) => void = () => {};
        const finished = new Promise((resolve) => { finish = resolve; });
        const { rerender } = render(<Popup open animations={[{ finished }]} />);
        rerender(<Popup open={false} animations={[{ finished }]} />);
        expect(screen.getByTestId('popup')).toHaveAttribute('data-ending-style');
        await act(async() => { finish(); await finished; });
        expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
    });

    test('reopening during the exit keeps it mounted', async() => {
        const finished = new Promise(() => {});
        const { rerender } = render(<Popup open animations={[{ finished }]} />);
        rerender(<Popup open={false} animations={[{ finished }]} />);
        rerender(<Popup open animations={[{ finished }]} />);
        expect(screen.getByTestId('popup')).not.toHaveAttribute('data-ending-style');
        expect(screen.getByTestId('popup')).toBeInTheDocument();
    });

    test('ignores infinite animations, which never finish', () => {
        const forever = { finished: new Promise(() => {}), playState: 'running', effect: { getComputedTiming: () => ({ iterations: Infinity }) } };
        const { rerender } = render(<Popup open animations={[forever]} />);
        rerender(<Popup open={false} animations={[forever]} />);
        expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
    });

    test('unmounts at once when the user prefers reduced motion', () => {
        const original = window.matchMedia;
        window.matchMedia = ((query: string) => ({ matches: query.includes('reduce'), media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
        try {
            const finished = new Promise(() => {});
            const { rerender } = render(<Popup open animations={[{ finished }]} />);
            rerender(<Popup open={false} animations={[{ finished }]} />);
            expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
        } finally {
            window.matchMedia = original;
        }
    });

    describe('onComplete', () => {
        const nextFrame = () => act(async() => { await new Promise((resolve) => requestAnimationFrame(() => resolve(null))); });

        test('is not called for something that starts open', async() => {
            const onComplete = jest.fn();
            render(<Popup open onComplete={onComplete} />);
            await nextFrame();
            expect(onComplete).not.toHaveBeenCalled();
        });

        test('reports open after the starting frame when nothing animates', async() => {
            const onComplete = jest.fn();
            const { rerender } = render(<Popup open={false} onComplete={onComplete} />);
            rerender(<Popup open onComplete={onComplete} />);
            expect(onComplete).not.toHaveBeenCalled();
            await nextFrame();
            expect(onComplete).toHaveBeenCalledWith(true);
            expect(onComplete).toHaveBeenCalledTimes(1);
        });

        test('waits for enter animations before reporting open', async() => {
            const onComplete = jest.fn();
            let finish: (value?: unknown) => void = () => {};
            const finished = new Promise((resolve) => { finish = resolve; });
            const { rerender } = render(<Popup open={false} animations={[{ finished }]} onComplete={onComplete} />);
            rerender(<Popup open animations={[{ finished }]} onComplete={onComplete} />);
            await nextFrame();
            expect(onComplete).not.toHaveBeenCalled();
            await act(async() => { finish(); await finished; });
            expect(onComplete).toHaveBeenCalledWith(true);
        });

        test('reports closed only after the exit animation finishes', async() => {
            const onComplete = jest.fn();
            let finish: (value?: unknown) => void = () => {};
            const finished = new Promise((resolve) => { finish = resolve; });
            const { rerender } = render(<Popup open animations={[{ finished }]} onComplete={onComplete} />);
            rerender(<Popup open={false} animations={[{ finished }]} onComplete={onComplete} />);
            expect(onComplete).not.toHaveBeenCalled();
            await act(async() => { finish(); await finished; });
            expect(onComplete).toHaveBeenCalledWith(false);
        });
    });
});
