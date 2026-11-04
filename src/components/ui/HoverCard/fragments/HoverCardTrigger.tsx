import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import HoverCardContext from '../contexts/HoverCardContext';

import Primitive from '~/core/primitives/Primitive';
import Floater from '~/core/primitives/Floater';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import type { PopupHandle } from '~/core/utils/popupHandle';
import { hoverCardHandleControls } from '../contexts/hoverCardHandleControls';

export type HoverCardTriggerElement = ElementRef<typeof Primitive.span>;
export type HoverCardTriggerProps = ComponentPropsWithoutRef<typeof Primitive.span> & {
    /** Open the card connected to this handle, even when rendered outside its Root. */
    handle?: PopupHandle<any>;
    /** Data for the card's content, such as the user this link points to. */
    payload?: unknown;
};

const HoverCardTrigger = forwardRef<HoverCardTriggerElement, HoverCardTriggerProps>(({ children, className = '', handle, payload, ...props }, ref) => {
    const { floatingRefs, getReferenceProps, closeWithDelay, openWithDelay, rootTriggerClass } = useContext(HoverCardContext);
    const subscribeHandle = React.useCallback((listener: () => void) => handle?.subscribe(listener) ?? (() => {}), [handle]);
    const handleState = React.useSyncExternalStore(subscribeHandle, () => handle?.getState(), () => handle?.getState());
    const triggerRef = React.useRef<HTMLSpanElement | null>(null);
    const detachedRef = Floater.useMergeRefs([triggerRef, ref]);
    // Hooks run before the detached/attached split so their order never changes.
    const mergedRef = Floater.useMergeRefs([floatingRefs?.setReference, ref]);
    const fallbackClass = useComponentClass('', 'HoverCard-trigger');

    if (handle) {
        // Detached: ask the Root (found through the handle) to open after its delay, anchored here.
        const active = Boolean(handleState?.open && handleState.trigger === triggerRef.current);
        const { onMouseEnter, onMouseLeave, onFocus, onBlur, ...rest } = props;
        const open = (trigger: HTMLElement) => hoverCardHandleControls.get(handle)?.openWithDelay({ trigger, payload });
        const close = () => hoverCardHandleControls.get(handle)?.closeWithDelay();
        return <Primitive.span
            ref={detachedRef}
            className={clsx(rootTriggerClass ?? fallbackClass, className)}
            data-slot="hover-card-trigger"
            data-state={active ? 'open' : 'closed'}
            {...rest}
            onMouseEnter={(event: React.MouseEvent<HTMLSpanElement>) => { onMouseEnter?.(event); open(event.currentTarget); }}
            onMouseLeave={(event: React.MouseEvent<HTMLSpanElement>) => { onMouseLeave?.(event); close(); }}
            onFocus={(event: React.FocusEvent<HTMLSpanElement>) => { onFocus?.(event); open(event.currentTarget); }}
            onBlur={(event: React.FocusEvent<HTMLSpanElement>) => { onBlur?.(event); close(); }}
        >{children}</Primitive.span>;
    }

    return <Primitive.span
        ref={mergedRef}
        className={clsx(rootTriggerClass, className)}
        {...getReferenceProps({
            'data-slot': 'hover-card-trigger',
            onMouseEnter: openWithDelay,
            onMouseLeave: closeWithDelay,
            // Keyboard users get the card when focus lands on (or inside) the trigger.
            onFocus: openWithDelay,
            onBlur: closeWithDelay,
            ...props
        })}
    >{children}</Primitive.span>;
});

HoverCardTrigger.displayName = 'HoverCardTrigger';

export default HoverCardTrigger;
