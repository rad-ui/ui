import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';
import clsx from 'clsx';

const ARROW_KEYS = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']);

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
    const { onKeyDown, ...restProps } = props;

    const setContentRef = React.useCallback((node: HTMLDivElement | null) => {
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
    }, [ref]);

    // Keyboard handling is scoped to this content element. A document-level
    // listener would keep reacting to arrow keys pressed anywhere on the page
    // (for example in a Tree) and reopen menubar menus.
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);

        // Arrow keys inside menu content belong to the menu. Stop them from
        // bubbling (through the React portal tree) to the menubar root, whose
        // roving focus would otherwise move between triggers as well.
        if (ARROW_KEYS.has(event.key)) {
            event.stopPropagation();
        }

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
            role="menu"
            aria-orientation="vertical"
            className={clsx(rootClass && `${rootClass}-content`, className)}
            // -1 keeps focus on the trigger when switching menus from the bar, while
            // the focus manager still returns focus to the trigger when the menu closes.
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
