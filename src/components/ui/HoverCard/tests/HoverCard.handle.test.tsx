import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import HoverCard from '../HoverCard';

const Mentions = ({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) => {
    const handle = React.useMemo(() => HoverCard.createHandle<string>(), []);
    return (
        <>
            <p>
                {['ada', 'grace'].map((user) => (
                    <HoverCard.Trigger key={user} handle={handle} payload={user}>
                        <a href={`#${user}`}>@{user}</a>
                    </HoverCard.Trigger>
                ))}
            </p>
            <HoverCard.Root handle={handle} openDelay={200} closeDelay={100} onOpenChange={onOpenChange}>
                {({ payload }) => <HoverCard.Content>Profile of {String(payload)}</HoverCard.Content>}
            </HoverCard.Root>
            <button>After</button>
        </>
    );
};

describe('HoverCard detached triggers', () => {
    beforeEach(() => { jest.useFakeTimers(); });
    afterEach(() => { jest.useRealTimers(); });

    test('hovering a detached trigger opens the shared card after the Root openDelay', () => {
        render(<Mentions />);
        const grace = screen.getByText('@grace').parentElement as HTMLElement;
        fireEvent.mouseEnter(grace);
        act(() => { jest.advanceTimersByTime(100); });
        expect(screen.queryByText(/Profile of/)).not.toBeInTheDocument();
        act(() => { jest.advanceTimersByTime(150); });
        expect(screen.getByText('Profile of grace')).toBeInTheDocument();
        expect(grace).toHaveAttribute('data-state', 'open');
        expect(screen.getByText('@ada').parentElement).toHaveAttribute('data-state', 'closed');
    });

    test('moving to another trigger swaps the payload', () => {
        render(<Mentions />);
        fireEvent.mouseEnter(screen.getByText('@ada').parentElement as HTMLElement);
        act(() => { jest.advanceTimersByTime(250); });
        expect(screen.getByText('Profile of ada')).toBeInTheDocument();
        fireEvent.mouseLeave(screen.getByText('@ada').parentElement as HTMLElement);
        fireEvent.mouseEnter(screen.getByText('@grace').parentElement as HTMLElement);
        act(() => { jest.advanceTimersByTime(250); });
        expect(screen.getByText('Profile of grace')).toBeInTheDocument();
    });

    test('leaving closes after the closeDelay, and the pointer can cross into the card', () => {
        const onOpenChange = jest.fn();
        render(<Mentions onOpenChange={onOpenChange} />);
        const ada = screen.getByText('@ada').parentElement as HTMLElement;
        fireEvent.mouseEnter(ada);
        act(() => { jest.advanceTimersByTime(250); });
        fireEvent.mouseLeave(ada);
        fireEvent.pointerEnter(screen.getByText('Profile of ada'));
        act(() => { jest.advanceTimersByTime(500); });
        expect(screen.getByText('Profile of ada')).toBeInTheDocument();

        fireEvent.pointerLeave(screen.getByText('Profile of ada'));
        act(() => { jest.advanceTimersByTime(150); });
        expect(screen.queryByText(/Profile of/)).not.toBeInTheDocument();
        expect(onOpenChange).toHaveBeenLastCalledWith(false);
    });

    test('focus opens it and Escape closes it', () => {
        render(<Mentions />);
        act(() => { screen.getByText('@grace').focus(); });
        act(() => { jest.advanceTimersByTime(250); });
        expect(screen.getByText('Profile of grace')).toBeInTheDocument();
        fireEvent.keyDown(document.activeElement as Element, { key: 'Escape' });
        act(() => { jest.advanceTimersByTime(10); });
        expect(screen.queryByText(/Profile of/)).not.toBeInTheDocument();
    });

    test('the handle can open and close it programmatically', () => {
        const handle = HoverCard.createHandle<string>();
        render(
            <>
                <HoverCard.Trigger handle={handle} payload="ada"><a href="#ada">@ada</a></HoverCard.Trigger>
                <HoverCard.Root handle={handle}>
                    {({ payload }) => <HoverCard.Content>Profile of {String(payload)}</HoverCard.Content>}
                </HoverCard.Root>
            </>
        );
        act(() => { handle.open('ada', screen.getByText('@ada').parentElement); });
        expect(screen.getByText('Profile of ada')).toBeInTheDocument();
        act(() => { handle.close(); });
        expect(screen.queryByText(/Profile of/)).not.toBeInTheDocument();
    });

    test('a detached trigger forwards its ref', () => {
        const ref = React.createRef<HTMLSpanElement>();
        const handle = HoverCard.createHandle();
        render(<HoverCard.Trigger ref={ref} handle={handle}>x</HoverCard.Trigger>);
        expect(ref.current?.tagName).toBe('SPAN');
    });
});
