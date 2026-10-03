import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';
import MenubarMenuContext from '../contexts/MenubarMenuContext';
import clsx from 'clsx';

export type MenubarContentElement = ElementRef<typeof MenuPrimitive.Content>;
export type MenubarContentProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Content>;

const MenubarContent = forwardRef<MenubarContentElement, MenubarContentProps>(({ children, className, ...props }, ref) => {
    const context = React.useContext(MenubarContext);
    if (!context) {
        console.warn('MenubarContent should be used in the MenubarRoot');
        return null;
    }
    const { rootClass, navigateMenu, contentInitialFocus } = context;
    const isOpen = React.useContext(MenubarMenuContext)?.isOpen ?? false;
    const { onKeyDown, ...restProps } = props;

    const setContentRef = React.useCallback((node: HTMLDivElement | null) => {
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
    }, [ref]);

    React.useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.defaultPrevented) return;

            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                navigateMenu(-1);
                return;
            }

            if (event.key === 'ArrowRight') {
                event.preventDefault();
                navigateMenu(1);
            }
        };

        document.addEventListener('keydown', handleKeyDown, true);

        return () => {
            document.removeEventListener('keydown', handleKeyDown, true);
        };
    }, [isOpen, navigateMenu]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            navigateMenu(-1);
            return;
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            navigateMenu(1);
        }
    };

    return (
        <MenuPrimitive.Content
            ref={setContentRef}
            className={clsx(rootClass && `${rootClass}-content`, className)}
            focusManagerDisabled={contentInitialFocus === -1}
            initialFocus={contentInitialFocus}
            onKeyDown={handleKeyDown}
            {...restProps}
        >
            {children}
        </MenuPrimitive.Content>
    );
});

MenubarContent.displayName = 'MenubarContent';

export default MenubarContent;
