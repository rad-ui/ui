import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import Separator from '../../Separator/Separator';
import MenubarContext from '../contexts/MenubarContext';
import clsx from 'clsx';

export type MenubarSeparatorElement = ElementRef<typeof Separator>;
export type MenubarSeparatorProps = {
    className?: string
} & ComponentPropsWithoutRef<typeof Separator>;

const MenubarSeparator = forwardRef<MenubarSeparatorElement, MenubarSeparatorProps>(({ className, ...props }: MenubarSeparatorProps, ref) => {
    const context = React.useContext(MenubarContext);
    if (!context) {
        console.warn('MenubarSeparator should be used within MenubarRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <Separator ref={ref} customRootClass={clsx(`${rootClass}`, className)} {...props}/>
    );
});

MenubarSeparator.displayName = 'MenubarSeparator';

export default MenubarSeparator;
