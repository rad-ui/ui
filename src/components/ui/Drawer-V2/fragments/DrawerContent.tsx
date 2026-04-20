'use client';
import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { DrawerContext } from '../context/DrawerContext';
import { DialogPrimitiveContext } from '~/core/primitives/Dialog/context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';
import Primitive from '~/core/primitives/Primitive';

type DrawerContentElement = React.ElementRef<typeof Primitive.div>;

export type DrawerContentProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    className?: string;
    asChild?: boolean;
    forceMount?: boolean;
};

// Must match $close-duration in drawer.clarity.scss
const EXIT_DURATION_MS = 400;

const DrawerContent = forwardRef<DrawerContentElement, DrawerContentProps>(({
    children,
    className = '',
    asChild = false,
    forceMount = false,
    role = 'dialog',
    'aria-modal': ariaModal = true,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    style: styleProp,
    ...props
}, ref) => {
    const { rootClass, swipeDirection } = useContext(DrawerContext);
    const { isOpen, getFloatingProps, refs, floaterContext } = useContext(DialogPrimitiveContext);

    // Keep the element mounted during the exit animation.
    // isVisible tracks whether we should render; dataState drives the CSS transition.
    const [isVisible, setIsVisible] = useState(isOpen);
    const [dataState, setDataState] = useState<'open' | 'closed'>(isOpen ? 'open' : 'closed');
    const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (exitTimerRef.current) clearTimeout(exitTimerRef.current);

        if (isOpen) {
            // Mount first, then flip to open on next frame so the CSS transition fires
            setIsVisible(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setDataState('open'));
            });
        } else {
            // Flip to closed (triggers exit transition), then unmount after it finishes
            setDataState('closed');
            exitTimerRef.current = setTimeout(() => {
                setIsVisible(false);
            }, EXIT_DURATION_MS);
        }

        return () => {
            if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
        };
    }, [isOpen]);

    const mergedRef = Floater.useMergeRefs([refs.setFloating, ref]);

    // Strip floating-ui's style injection — drawer positioning is owned by CSS
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { style: _ignored = undefined, ...floatingProps } = (getFloatingProps() ?? {}) as any;

    if (!isVisible && !forceMount) return null;

    return (
        <Floater.FocusManager
            context={floaterContext}
            modal={Boolean(ariaModal)}
            initialFocus={0}
            returnFocus={true}
        >
            <Primitive.div
                ref={mergedRef}
                asChild={asChild}
                {...floatingProps}
                style={{ outline: 'none', ...styleProp }}
                role={role}
                aria-modal={ariaModal}
                aria-hidden={!isOpen ? 'true' : undefined}
                aria-labelledby={isOpen ? ariaLabelledBy : undefined}
                aria-describedby={isOpen ? ariaDescribedBy : undefined}
                data-state={dataState}
                data-swipe-direction={swipeDirection}
                className={clsx(rootClass && `${rootClass}-content`, className)}
                {...props}
            >
                {children}
            </Primitive.div>
        </Floater.FocusManager>
    );
});

DrawerContent.displayName = 'DrawerContent';

export default DrawerContent;
