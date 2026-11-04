import React from 'react';
import clsx from 'clsx';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import Primitive from '~/core/primitives/Primitive';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import { mergeRefs } from '~/core/utils/mergeRefs';
import { stateData } from '~/core/utils/stateAttributes';

export type NavigationMenuViewportElement = React.ElementRef<'div'>;

export interface NavigationMenuViewportProps extends React.ComponentPropsWithoutRef<'div'> {
    asChild?: boolean;
}

type Size = { width: number; height: number };

/**
 * One shared container for every content panel. Render it once inside `NavigationMenu.Root`
 * (after the items) and open panels show inside it instead of under their own trigger.
 * It sets `--rad-navigation-menu-viewport-width` and `--rad-navigation-menu-viewport-height`
 * (and the Radix-named equivalents) to the open panel's size, so CSS can animate between panels.
 */
const NavigationMenuViewport = React.forwardRef<NavigationMenuViewportElement, NavigationMenuViewportProps>(
    ({ className, style, asChild = false, ...props }, ref) => {
        const { rootClass, isOpen, setViewport, activeContent } = React.useContext(NavigationMenuRootContext);
        const [size, setSize] = React.useState<Size | null>(null);
        const open = Boolean(isOpen);

        useLayoutEffect(() => {
            if (!activeContent) return;
            const measure = () => {
                const next = { width: activeContent.offsetWidth, height: activeContent.offsetHeight };
                setSize((current) => (current && current.width === next.width && current.height === next.height ? current : next));
            };
            measure();
            if (typeof ResizeObserver === 'undefined') return;
            const observer = new ResizeObserver(measure);
            observer.observe(activeContent);
            return () => observer.disconnect();
        }, [activeContent]);

        const sizeVariables = size
            ? ({
                '--rad-navigation-menu-viewport-width': `${size.width}px`,
                '--rad-navigation-menu-viewport-height': `${size.height}px`,
                '--radix-navigation-menu-viewport-width': `${size.width}px`,
                '--radix-navigation-menu-viewport-height': `${size.height}px`
            } as React.CSSProperties)
            : undefined;

        return (
            <Primitive.div
                ref={mergeRefs(setViewport, ref)}
                className={clsx(rootClass && `${rootClass}-viewport`, className)}
                {...stateData(open ? 'open' : 'closed')}
                data-slot="navigation-menu-viewport"
                hidden={!open || undefined}
                asChild={asChild}
                style={{ ...sizeVariables, ...style }}
                {...props}
            />
        );
    }
);

NavigationMenuViewport.displayName = 'NavigationMenuViewport';

export default NavigationMenuViewport;
