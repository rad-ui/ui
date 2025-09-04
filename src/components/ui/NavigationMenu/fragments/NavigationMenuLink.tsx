import React from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import clsx from 'clsx';

export interface NavigationMenuLinkProps extends React.ComponentPropsWithoutRef<'a'> {
    href: string;
}

const NavigationMenuLink = React.forwardRef<HTMLButtonElement, NavigationMenuLinkProps>(
    ({ children, href, className, ...props }, ref) => {
        const { rootClass } = React.useContext(NavigationMenuRootContext);
        return (
            <RovingFocusGroup.Item ref={ref}>
                <a href={href} className={clsx(`${rootClass}-link`, className)} {...props}>
                    {children}
                </a>
            </RovingFocusGroup.Item>
        );
    }
);

NavigationMenuLink.displayName = 'NavigationMenuLink';

export default NavigationMenuLink;

