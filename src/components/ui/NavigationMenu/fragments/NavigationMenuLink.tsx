import React from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import clsx from 'clsx';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';
import { mergeRefs } from '~/core/utils/mergeRefs';
import NavigationMenuItemContext from '../contexts/NavigationMenyItemContext';

export type NavigationMenuLinkElement = React.ElementRef<'a'>;

export interface NavigationMenuLinkProps extends React.ComponentPropsWithoutRef<'a'> {
    href: string;
}

const NavigationMenuLink = React.forwardRef<NavigationMenuLinkElement, NavigationMenuLinkProps>(
    ({ children, href, className, onClick, ...props }, ref) => {
        const { rootClass, setIsOpen } = React.useContext(NavigationMenuRootContext);
        const { registerLink } = React.useContext(NavigationMenuItemContext);
        const linkRef = React.useRef<HTMLAnchorElement>(null);

        React.useEffect(() => {
            const node = linkRef.current;
            if (!node || !registerLink) return;
            return registerLink(node);
        }, [registerLink]);

        // Selecting a link dismisses the open panel, so it does not linger over the page after
        // client-side navigation. This runs even when the consumer's onClick calls preventDefault(),
        // because that is how router-driven links (router.push) take over navigation.
        const handleClick = () => setIsOpen('');
        return (
            <RovingFocusGroup.Item>
                <a
                    ref={mergeRefs(linkRef, ref)}
                    href={href}
                    className={clsx(rootClass && `${rootClass}-link`, className)}
                    {...props}
                    onClick={composeEventHandlers(onClick, handleClick, { checkForDefaultPrevented: false })}
                >
                    {children}
                </a>
            </RovingFocusGroup.Item>
        );
    }
);

NavigationMenuLink.displayName = 'NavigationMenuLink';

export default NavigationMenuLink;
