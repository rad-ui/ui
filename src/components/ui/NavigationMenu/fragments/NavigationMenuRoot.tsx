import React from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import { useControllableState } from '~/core/hooks/useControllableState';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';
import { useDirection } from '~/core/hooks/useDirection';
import { usePopupActions, PopupActions } from '~/core/hooks/usePopupActions';

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
    /** ms the pointer rests on a trigger before its panel opens. Defaults to 0. */
    delay?: number;
    /** ms after the pointer leaves before the panel closes. Defaults to 150. */
    closeDelay?: number;
    /**
     * Layout of the triggers. `vertical` moves between them with ArrowUp/ArrowDown and opens a
     * panel with ArrowRight (ArrowLeft in right-to-left). Defaults to `horizontal`.
     */
    orientation?: 'horizontal' | 'vertical';
    /** Called after a panel's open or close animation finishes (at once when there is none). */
    onOpenChangeComplete?: (open: boolean) => void;
    /** Ref with `close()`, to close the open panel from code. */
    actionsRef?: React.Ref<PopupActions>;
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
            delay = 0,
            closeDelay = 150,
            orientation = 'horizontal',
            onOpenChangeComplete,
            actionsRef,
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
        usePopupActions(actionsRef, () => setIsOpen(''));

        return (
            <nav ref={ref} dir={dir} data-orientation={orientation} {...props}>
                <NavigationMenuRootContext.Provider value={{ isOpen, setIsOpen, rootClass, contentLoop, dir, viewport, setViewport, activeContent, setActiveContent, triggersRef, delay, closeDelay, orientation, onOpenChangeComplete }}>
                    <RovingFocusGroup.Root loop={loop} dir={dir} orientation={orientation}>
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
