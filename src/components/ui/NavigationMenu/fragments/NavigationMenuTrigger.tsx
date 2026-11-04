import React from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import NavigationMenuItemContext from '../contexts/NavigationMenyItemContext';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import clsx from 'clsx';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';
import { mergeRefs } from '~/core/utils/mergeRefs';
import { KEYBOARD_KEYS } from '~/core/utils/keyboard';
import { stateData } from '~/core/utils/stateAttributes';

export type NavigationMenuTriggerElement = React.ElementRef<'button'>;

export interface NavigationMenuTriggerProps extends React.ComponentPropsWithoutRef<'button'> {}

const NavigationMenuTrigger = React.forwardRef<NavigationMenuTriggerElement, NavigationMenuTriggerProps>(
    ({ children, className, onClick, onKeyDown, ...props }, ref) => {
        const { handleTrigger, itemOpen, triggerRef, contentId, openAndFocusFirstLink } = React.useContext(NavigationMenuItemContext);

        // APG disclosure navigation: ArrowDown on a trigger opens its panel (if closed) and moves
        // focus to the first link inside it.
        const { rootClass, viewport, triggersRef, orientation, dir } = React.useContext(NavigationMenuRootContext);
        // A vertical menu moves between triggers with ArrowUp/Down, so the panel opens towards the inline end.
        const openKey = orientation === 'vertical'
            ? (dir === 'rtl' ? KEYBOARD_KEYS.ARROW_LEFT : KEYBOARD_KEYS.ARROW_RIGHT)
            : KEYBOARD_KEYS.ARROW_DOWN;
        const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (!openAndFocusFirstLink || props.disabled) return;
            // In a viewport the open panel sits after every trigger in the DOM, so Tab from its
            // trigger jumps into it, as it would if the panel followed the trigger.
            const tabIntoViewport = event.key === 'Tab' && !event.shiftKey && itemOpen && !!viewport;
            if (event.key !== openKey && !tabIntoViewport) return;
            event.preventDefault();
            openAndFocusFirstLink();
        };

        React.useEffect(() => {
            const node = triggerRef.current;
            const triggers = triggersRef?.current;
            if (!node || !triggers) return;
            triggers.add(node);
            return () => {
                triggers.delete(node);
            };
        }, [triggerRef, triggersRef]);

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
                    {...stateData(itemOpen ? 'open' : 'closed')}
                    data-disabled={props.disabled ? '' : undefined}
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
