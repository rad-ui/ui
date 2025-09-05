import React, { ElementRef, ComponentPropsWithoutRef } from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import clsx from 'clsx';

export interface NavigationMenuLinkProps extends ComponentPropsWithoutRef<'a'> {
    href: string;
}

type NavigationMenuLinkElement = ElementRef<'a'>;

const NavigationMenuLink = React.forwardRef<NavigationMenuLinkElement, NavigationMenuLinkProps>(
    ({ children, href, className, ...props }, ref) => {
        const { rootClass } = React.useContext(NavigationMenuRootContext);
        return (
            <RovingFocusGroup.Item>
                <a
                    ref={ref}
                    href={href}
                    className={clsx(`${rootClass}-link`, className)}
                    {...props}
                >
                    {children}
                </a>
            </RovingFocusGroup.Item>
        );
    }
);

NavigationMenuLink.displayName = 'NavigationMenuLink';

export default NavigationMenuLink;

