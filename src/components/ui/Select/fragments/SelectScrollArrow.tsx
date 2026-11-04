'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { SelectRootContext } from '../contexts/SelectRootContext';
import { SelectContentContext } from '../contexts/SelectContentContext';

const SCROLL_STEP_PX = 16;
const SCROLL_INTERVAL_MS = 30;

export type SelectScrollArrowProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    /** Keep the arrow rendered (hidden) while the list can't scroll that way. */
    forceMount?: boolean;
};

type Direction = 'up' | 'down';

const canScroll = (node: HTMLElement, direction: Direction) => (direction === 'up'
    ? node.scrollTop > 0
    : Math.ceil(node.scrollTop + node.clientHeight) < node.scrollHeight);

/**
 * Sits at the top or bottom edge of `Select.Content` while the list can scroll that way.
 * Resting the pointer on it scrolls the list. It's hidden from assistive technology;
 * keyboard users scroll by moving through the options.
 */
const createSelectScrollArrow = (direction: Direction, displayName: string) => {
    const SelectScrollArrow = React.forwardRef<React.ElementRef<'div'>, SelectScrollArrowProps>(
        ({ forceMount = false, className, children, onPointerEnter, onPointerMove, onPointerLeave, ...props }, ref) => {
            const { rootClass } = useContext(SelectRootContext);
            const content = useContext(SelectContentContext);
            const [visible, setVisible] = React.useState(false);
            const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

            const stop = React.useCallback(() => {
                if (timerRef.current !== null) clearInterval(timerRef.current);
                timerRef.current = null;
            }, []);

            React.useEffect(() => {
                if (!content) return;
                const update = () => setVisible(canScroll(content, direction));
                update();
                content.addEventListener('scroll', update, { passive: true });
                let observer: ResizeObserver | undefined;
                if (typeof ResizeObserver !== 'undefined') {
                    observer = new ResizeObserver(update);
                    observer.observe(content);
                }
                return () => {
                    content.removeEventListener('scroll', update);
                    observer?.disconnect();
                };
            }, [content]);

            // Nothing left to scroll (or unmounting): stop auto-scrolling.
            React.useEffect(() => {
                if (!visible) stop();
            }, [visible, stop]);
            React.useEffect(() => stop, [stop]);

            const start = () => {
                if (!content || timerRef.current !== null) return;
                timerRef.current = setInterval(() => {
                    content.scrollTop += direction === 'up' ? -SCROLL_STEP_PX : SCROLL_STEP_PX;
                    if (!canScroll(content, direction)) stop();
                }, SCROLL_INTERVAL_MS);
            };

            if (!visible && !forceMount) return null;

            return (
                <Primitive.div
                    ref={ref}
                    aria-hidden="true"
                    className={clsx(rootClass ? `${rootClass}-scroll-arrow` : undefined, className) || undefined}
                    data-slot={`select-scroll-${direction}-arrow`}
                    data-direction={direction}
                    data-visible={visible ? '' : undefined}
                    hidden={!visible || undefined}
                    {...props}
                    onPointerEnter={(event: React.PointerEvent<HTMLDivElement>) => { onPointerEnter?.(event); start(); }}
                    onPointerMove={(event: React.PointerEvent<HTMLDivElement>) => { onPointerMove?.(event); start(); }}
                    onPointerLeave={(event: React.PointerEvent<HTMLDivElement>) => { onPointerLeave?.(event); stop(); }}
                >
                    {children ?? (
                        <svg width="12" height="12" viewBox="0 0 15 15" fill="none" aria-hidden="true" style={direction === 'up' ? { transform: 'rotate(180deg)' } : undefined}>
                            <path d="M3.5 5.5L7.5 9.5L11.5 5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </Primitive.div>
            );
        }
    );
    SelectScrollArrow.displayName = displayName;
    return SelectScrollArrow;
};

export const SelectScrollUpArrow = createSelectScrollArrow('up', 'SelectScrollUpArrow');
export const SelectScrollDownArrow = createSelectScrollArrow('down', 'SelectScrollDownArrow');
