import React, { useId } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { CollapsiblePrimitiveContext } from '../contexts/CollapsiblePrimitiveContext';
import useControllableState from '~/core/hooks/useControllableState';

type CollapsiblePrimitiveRootElement = React.ElementRef<typeof Primitive.div>;
export type CollapsiblePrimitiveRootProps =
    React.ComponentPropsWithoutRef<typeof Primitive.div> & {
        /**
         * Whether the collapsible is open by default (uncontrolled)
         */
        defaultOpen?: boolean;
        /**
         * Controls the open state (controlled)
         */
        open?: boolean;
        /**
         * Callback fired when the open state changes
         */
        onOpenChange?: (open: boolean) => void;
        /**
         * Disables the collapsible
         */
        disabled?: boolean;
        /**
         * Duration of the height transition animation in milliseconds
         */
        transitionDuration?: number;
        /**
         * CSS timing function for the transition
         */
        transitionTimingFunction?: string;
    };

const CollapsiblePrimitiveRoot = React.forwardRef<
    CollapsiblePrimitiveRootElement,
    CollapsiblePrimitiveRootProps
>(({ children,
    defaultOpen = false,
    open,
    onOpenChange,
    disabled = false,
    transitionDuration = 300,
    transitionTimingFunction = 'linear',
    ...props
}, forwardedRef) => {
    const contentId = useId();

    // Using the useControllableState hook to manage state
    const [isOpen, setIsOpen] = useControllableState<boolean>(
        open,
        defaultOpen,
        onOpenChange
    );

    const handleOpenChange = (newOpen: boolean) => {
        if (disabled) return;
        setIsOpen(newOpen);
    };

    return (
        <CollapsiblePrimitiveContext.Provider
            value={{
                open: isOpen,
                onOpenChange: handleOpenChange,
                disabled,
                contentId,
                transitionDuration,
                transitionTimingFunction
            }}
        >
            <Primitive.div
                {...props}
                ref={forwardedRef}
                data-state={isOpen ? 'open' : 'closed'}
                data-disabled={disabled ? '' : undefined}
            >
                {children}
            </Primitive.div>
        </CollapsiblePrimitiveContext.Provider>
    );
});

CollapsiblePrimitiveRoot.displayName = 'CollapsiblePrimitiveRoot';

export default CollapsiblePrimitiveRoot;
