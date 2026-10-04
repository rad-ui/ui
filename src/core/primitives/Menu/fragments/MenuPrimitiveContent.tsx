import React, { useContext, forwardRef } from 'react';
import { flushSync } from 'react-dom';
import { getNextTabbable } from '@floating-ui/react/utils';

import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';

export type MenuPrimitiveContentProps = {
    children: React.ReactNode;
    className?: string;
    initialFocus?: number;
    focusManagerDisabled?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const MenuPrimitiveContent = forwardRef<HTMLDivElement, MenuPrimitiveContentProps>(
    ({ children, className, initialFocus, focusManagerDisabled = false, ...props }, propRef) => {
        const context = useContext(MenuPrimitiveRootContext);
        const tree = Floater.useFloatingTree();
        const mergedRef = Floater.useMergeRefs([
            context?.refs.setFloating,
            propRef
        ]);
        if (!context || !context.isOpen) return null;
        const {
            floatingStyles,
            getFloatingProps,
            elementsRef,
            labelsRef,
            isNested,
            floatingContext,
            maxHeight,
            getRootTrigger
        } = context;

        // Menu button pattern (WAI-ARIA APG): Tab / Shift+Tab close the whole
        // menu tree. Shift+Tab returns focus to the trigger; Tab moves focus to
        // the next tabbable element after the trigger. Focus is computed from the
        // trigger rather than left to the browser, so inline (non-portaled)
        // content and portaled content behave the same.
        const handleTabKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key !== 'Tab' || event.defaultPrevented) return;
            const trigger = getRootTrigger();
            if (!(trigger instanceof HTMLElement)) return;
            event.preventDefault();
            // Close synchronously so the content is gone before focus moves on.
            flushSync(() => {
                tree?.events.emit('click');
            });
            const moveForward = !event.shiftKey;
            // Queued after the focus manager's own return-focus microtask so it wins.
            queueMicrotask(() => {
                trigger.focus();
                if (!moveForward) return;
                const next = getNextTabbable(trigger);
                if (next instanceof HTMLElement && next !== trigger) next.focus();
            });
        };

        const consumerStyle = (props as React.HTMLAttributes<HTMLDivElement>).style;
        const restProps = { ...props } as Record<string, unknown>;
        delete restProps.style;
        const scrollContainerStyle: React.CSSProperties = {
            overflowY: 'auto',
            overflowX: 'hidden',
            maxHeight: maxHeight !== undefined ? `${maxHeight}px` : undefined,
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain'
        };

        return (
            <>
            <Floater.FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                <Floater.FocusManager
                    context={floatingContext}
                    disabled={focusManagerDisabled}
                    modal={false}
                    initialFocus={initialFocus ?? (isNested ? -1 : 0)}
                    returnFocus={!isNested}
                >         
                    <div
                        ref={mergedRef}
                        {...(getFloatingProps as (userProps?: Record<string, unknown>) => Record<string, unknown>)({
                            ...restProps,
                            className,
                            'data-state': 'open',
                            onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
                                (restProps.onKeyDown as React.KeyboardEventHandler<HTMLDivElement> | undefined)?.(event);
                                handleTabKey(event);
                            },
                            style: { ...consumerStyle, ...floatingStyles }
                        })}
                    >
                        <div style={scrollContainerStyle}>
                        {children}
                        </div>
                    </div>
                </Floater.FocusManager>
            </Floater.FloatingList>
             </>
        );
    }
);

MenuPrimitiveContent.displayName = 'MenuPrimitiveContent';
export default MenuPrimitiveContent;
