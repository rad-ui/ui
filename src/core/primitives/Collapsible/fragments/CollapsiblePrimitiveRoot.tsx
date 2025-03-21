import React, { useId } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { CollapsiblePrimitiveContext } from '../contexts/CollapsiblePrimitiveContext';
import useControllableState from '~/core/hooks/useControllableState';

export type CollapsiblePrimitiveRootProps = {
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
   * Content to be rendered inside the collapsible
   * Should include CollapsiblePrimitive.Trigger and CollapsiblePrimitive.Content components,
   * which will automatically connect to this root component via context
   */
  children?: React.ReactNode;
  /**
   * Disables the collapsible
   */
  disabled?: boolean;
  /**
   * CSS class name for custom styling
   */
  className?: string;
  /**
   * Duration of the height transition animation in milliseconds
   */
  transitionDuration?: number;
  /**
   * CSS timing function for the transition
   */
  transitionTimingFunction?: string;
  /**
   * Additional props to be spread on the root element
   */
  [key: string]: any;
};

const CollapsiblePrimitiveRoot = ({
    children,
    defaultOpen = false,
    open,
    onOpenChange,
    disabled = false,
    transitionDuration = 300,
    transitionTimingFunction = 'ease-out',
    ...props
}: CollapsiblePrimitiveRootProps) => {
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
                data-state={isOpen ? 'open' : 'closed'}
                data-disabled={disabled ? '' : undefined}
            >
                {children}
            </Primitive.div>
        </CollapsiblePrimitiveContext.Provider>
    );
};

export default CollapsiblePrimitiveRoot;
