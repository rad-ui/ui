import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import HoverCardContext from '../contexts/HoverCardContext';

import Primitive from '~/core/primitives/Primitive';
import Floater from '~/core/primitives/Floater';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import type { PopupHandle } from '~/core/utils/popupHandle';
import { hoverCardHandleControls } from '../contexts/hoverCardHandleControls';
import { stateData } from '~/core/utils/stateAttributes';

export type HoverCardTriggerElement = ElementRef<typeof Primitive.span>;
export type HoverCardTriggerProps = ComponentPropsWithoutRef<typeof Primitive.span> & {
    /** Open the card connected to this handle, even when rendered outside its Root. */
    handle?: PopupHandle<any>;
    /** Data for the card's content, such as the user this link points to. */
    payload?: unknown;
    /** ms before opening from this trigger. Overrides the Root's `openDelay`. */
    delay?: number;
    /** ms before closing after leaving this trigger. Overrides the Root's `closeDelay`. */
    closeDelay?: number;
};

const HoverCardTrigger = forwardRef<HoverCardTriggerElement, HoverCardTriggerProps>(({ children, className = '', handle, payload, delay, closeDelay, ...props }, ref) => {
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
        const open = (trigger: HTMLElement, event: React.SyntheticEvent) => hoverCardHandleControls.get(handle)?.openWithDelay({ trigger, payload }, event.nativeEvent, delay);
        const close = (event: React.SyntheticEvent) => hoverCardHandleControls.get(handle)?.closeWithDelay(event.nativeEvent, closeDelay);
        return <Primitive.span
            ref={detachedRef}
            className={clsx(rootTriggerClass ?? fallbackClass, className)}
            data-slot="hover-card-trigger"
            {...stateData(active ? 'open' : 'closed')}
            {...rest}
            onMouseEnter={(event: React.MouseEvent<HTMLSpanElement>) => { onMouseEnter?.(event); open(event.currentTarget, event); }}
            onMouseLeave={(event: React.MouseEvent<HTMLSpanElement>) => { onMouseLeave?.(event); close(event); }}
            onFocus={(event: React.FocusEvent<HTMLSpanElement>) => { onFocus?.(event); open(event.currentTarget, event); }}
            onBlur={(event: React.FocusEvent<HTMLSpanElement>) => { onBlur?.(event); close(event); }}
        >{children}</Primitive.span>;
    }

    return <Primitive.span
        ref={mergedRef}
        className={clsx(rootTriggerClass, className)}
        {...getReferenceProps({
            'data-slot': 'hover-card-trigger',
            onMouseEnter: (event: React.SyntheticEvent) => openWithDelay(event.nativeEvent, delay),
            onMouseLeave: (event: React.SyntheticEvent) => closeWithDelay(event.nativeEvent, closeDelay),
            // Keyboard users get the card when focus lands on (or inside) the trigger.
            onFocus: (event: React.SyntheticEvent) => openWithDelay(event.nativeEvent, delay),
            onBlur: (event: React.SyntheticEvent) => closeWithDelay(event.nativeEvent, closeDelay),
            ...props
        })}
    >{children}</Primitive.span>;
});

HoverCardTrigger.displayName = 'HoverCardTrigger';

export default HoverCardTrigger;
