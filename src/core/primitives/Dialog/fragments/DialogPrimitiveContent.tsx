'use client';
import React, { forwardRef, useContext } from 'react';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';
import Primitive from '~/core/primitives/Primitive';

export type DialogPrimitiveContentProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    children: React.ReactNode;
    asChild?: boolean;
    forceMount?: boolean;
    initialFocus?: boolean | React.RefObject<HTMLElement | null> | (() => boolean | void | HTMLElement | null);
    finalFocus?: boolean | React.RefObject<HTMLElement | null> | (() => boolean | void | HTMLElement | null);
    trapFocus?: boolean;
}

const DialogPrimitiveContent = forwardRef<HTMLDivElement, DialogPrimitiveContentProps>(({
    children,
    asChild = false,
    forceMount = false,
    initialFocus = true,
    finalFocus = true,
    trapFocus = true,
    role = 'dialog',
    'aria-modal': ariaModal = true,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    style: styleProp,
    ...props
}, ref) => {
    const { isOpen, getFloatingProps, refs, floaterContext } = useContext(DialogPrimitiveContext);
    const previousFocusedElementRef = React.useRef<HTMLElement | null>(null);
    const referenceElement = refs.reference?.current;

    const mergedRef = Floater.useMergeRefs([refs.setFloating, ref]);
    const shouldRender = isOpen || forceMount;
    const dataState = isOpen ? 'open' : 'closed';

    React.useEffect(() => {
        if (isOpen) {
            previousFocusedElementRef.current = document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null;
            return;
        }

        const resolveFinalFocus = () => {
            if (finalFocus === false) {
                return null;
            }

            if (finalFocus === true) {
                return referenceElement instanceof HTMLElement
                    ? referenceElement
                    : previousFocusedElementRef.current;
            }

            if ('current' in finalFocus) {
                return finalFocus.current;
            }

            const result = finalFocus();
            if (result === true) {
                return referenceElement instanceof HTMLElement
                    ? referenceElement
                    : previousFocusedElementRef.current;
            }

            return result instanceof HTMLElement ? result : null;
        };

        const target = resolveFinalFocus();

        if (target) {
            requestAnimationFrame(() => {
                target.focus();
            });
        }
    }, [finalFocus, isOpen, referenceElement]);

    const resolvedInitialFocus = React.useMemo(() => {
        if (initialFocus === false) {
            return -1;
        }

        if (initialFocus === true) {
            return 0;
        }

        if ('current' in initialFocus) {
            return initialFocus;
        }

        const result = initialFocus();
        if (result === false || result === undefined) {
            return -1;
        }

        if (result === true) {
            return 0;
        }

        return result;
    }, [initialFocus]);
    const content = (
        <Primitive.div
            ref={mergedRef}
            asChild={asChild}
            {...getFloatingProps()}
            style={{ outline: 'none', ...styleProp }}
            role={role}
            aria-hidden={!isOpen ? 'true' : undefined}
            aria-labelledby={isOpen ? ariaLabelledBy : undefined}
            aria-describedby={isOpen ? ariaDescribedBy : undefined}
            data-state={dataState}
            aria-modal={ariaModal}
            {...props}
        >
            {children}
        </Primitive.div>
    );

    return (
        <>
            {shouldRender && (
                isOpen
                    ? (
                        <Floater.FocusManager
                            context={floaterContext}
                            modal={trapFocus}
                            initialFocus={resolvedInitialFocus as any}
                            returnFocus={finalFocus !== false}
                        >
                            {content}
                        </Floater.FocusManager>
                    )
                    : content
            )}
        </>
    );
});

DialogPrimitiveContent.displayName = 'DialogPrimitiveContent';

export default DialogPrimitiveContent;
