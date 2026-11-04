import React from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import { useControllableState } from '~/core/hooks/useControllableState';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';
import { useDirection } from '~/core/hooks/useDirection';

const COMPONENT_NAME = 'NavigationMenu';

// Renders a <nav> landmark. Typed as HTMLElement (the nav element type); RefObject<HTMLDivElement>
// refs from earlier versions remain assignable.
export type NavigationMenuRootElement = React.ElementRef<'nav'>;

export interface NavigationMenuRootProps extends React.ComponentPropsWithoutRef<'nav'> {
    children: React.ReactNode;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    customRootClass?: string;
    loop?: boolean;
    contentLoop?: boolean;
    /** Reading direction. In `rtl`, ArrowLeft moves to the next item. Content inherits it. */
    dir?: 'ltr' | 'rtl';
}

const NavigationMenuRoot = React.forwardRef<NavigationMenuRootElement, NavigationMenuRootProps>(
    (
        {
            children,
            value,
            defaultValue = '',
            onValueChange,
            customRootClass,
            loop = true,
            contentLoop = true,
            dir: dirProp,
            className,
            ...props
        },
        ref
    ) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
        const dir = useDirection(dirProp);
        const [isOpen, setIsOpen] = useControllableState(value, defaultValue, onValueChange);
        const [viewport, setViewport] = React.useState<HTMLElement | null>(null);
        const [activeContent, setActiveContent] = React.useState<HTMLElement | null>(null);
        const triggersRef = React.useRef(new Set<HTMLElement>());

        return (
            <nav ref={ref} dir={dir} {...props}>
                <NavigationMenuRootContext.Provider value={{ isOpen, setIsOpen, rootClass, contentLoop, dir, viewport, setViewport, activeContent, setActiveContent, triggersRef }}>
                    <RovingFocusGroup.Root loop={loop} dir={dir}>
                        <RovingFocusGroup.Group className={clsx(rootClass && `${rootClass}-root`, className)}>
                            {children}
                        </RovingFocusGroup.Group>
                    </RovingFocusGroup.Root>
                </NavigationMenuRootContext.Provider>
            </nav>
        );
    }
);

NavigationMenuRoot.displayName = COMPONENT_NAME;

export default NavigationMenuRoot;
