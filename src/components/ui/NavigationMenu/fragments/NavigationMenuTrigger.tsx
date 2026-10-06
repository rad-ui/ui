import React from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import NavigationMenuItemContext from '../contexts/NavigationMenyItemContext';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import clsx from 'clsx';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';
import { mergeRefs } from '~/core/utils/mergeRefs';
import { KEYBOARD_KEYS } from '~/core/utils/keyboard';

export type NavigationMenuTriggerElement = React.ElementRef<'button'>;

export interface NavigationMenuTriggerProps extends React.ComponentPropsWithoutRef<'button'> {}

const NavigationMenuTrigger = React.forwardRef<NavigationMenuTriggerElement, NavigationMenuTriggerProps>(
    ({ children, className, onClick, onKeyDown, ...props }, ref) => {
        const { handleTrigger, itemOpen, triggerRef, contentId, openAndFocusFirstLink } = React.useContext(NavigationMenuItemContext);

        // APG disclosure navigation: ArrowDown on a trigger opens its panel (if closed) and moves
        // focus to the first link inside it.
        const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (event.key !== KEYBOARD_KEYS.ARROW_DOWN || !openAndFocusFirstLink) return;
            event.preventDefault();
            openAndFocusFirstLink();
        };
        const { rootClass } = React.useContext(NavigationMenuRootContext);

        return (
            <RovingFocusGroup.Item>
                <button
                    ref={mergeRefs(triggerRef, ref)}
                    onClick={composeEventHandlers(onClick, handleTrigger)}
                    onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
                    className={clsx(rootClass && `${rootClass}-trigger`, className)}
                    aria-expanded={itemOpen}
                    // The content panel only exists while open, so only reference it then.
                    aria-controls={itemOpen ? contentId : undefined}
                    data-state={itemOpen ? 'open' : 'closed'}
                    {...props}
                >
                    {children}
                </button>
            </RovingFocusGroup.Item>
        );
    }
);

NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

export default NavigationMenuTrigger;
