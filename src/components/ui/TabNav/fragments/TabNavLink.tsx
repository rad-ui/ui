import React, { useContext, useEffect, useId, forwardRef } from 'react';
import clsx from 'clsx';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import { RovingFocusGroupContext } from '~/core/utils/RovingFocusGroup/context/RovingFocusGroupContext';
import Primitive from '~/core/primitives/Primitive';
import TabNavContext from '../context/TabNav.context';

export type TabNavLinkProps = React.ComponentPropsWithoutRef<'a'> & {
    disabled?: boolean,
    asChild?: boolean,
    value?: string,
    /**
     * Marks this link as the current page. Overrides the value-based selection from `TabNav.Root`,
     * which is useful when the active link is derived from the router.
     */
    active?: boolean
}

const TabNavLink = forwardRef<React.ElementRef<'a'>, TabNavLinkProps>(({
    value, className = '', href = '#', children, disabled, asChild, active, id, onClick, ...props
}, forwardedRef) => {
    const { rootClass, tabValue, handleTabChange } = useContext(TabNavContext);
    const { setFocusedItemId } = useContext(RovingFocusGroupContext);
    if (asChild) disabled = false;

    const autoId = useId();
    const linkId = id ?? autoId;

    const isActive = active ?? (value !== undefined && value === tabValue);

    // The current link is the group's tab stop, so tabbing back into the nav lands on it.
    useEffect(() => {
        if (isActive && !disabled) {
            setFocusedItemId(linkId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive, disabled, linkId]);

    // Selection follows activation (click / Enter), not focus: moving focus with the arrow keys must
    // not mark a link as the current page before the user has navigated to it.
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
            event.preventDefault();
            return;
        }
        onClick?.(event);
        if (event.defaultPrevented || value === undefined) return;
        handleTabChange(value);
    };

    return (
        <RovingFocusGroup.Item domId={linkId}>
            <Primitive.a
                ref={forwardedRef}
                id={linkId}
                className={clsx(rootClass && `${rootClass}-link`, className)}
                asChild={asChild}
                onClick={handleClick}
                aria-disabled={disabled}
                aria-current={isActive ? 'page' : undefined}
                data-state={isActive ? 'active' : 'inactive'}
                data-disabled={disabled ? '' : undefined}
                data-slot="tab-nav-link"
                // `disabled` is not an <a> attribute, but matters when asChild renders a <button>.
                {...({ disabled } as Record<string, unknown>)}
                {...disabled ? {} : { href }}
                {...props}
            >
                {children}
            </Primitive.a>
        </RovingFocusGroup.Item>
    );
});

TabNavLink.displayName = 'TabNavLink';

export default TabNavLink;
