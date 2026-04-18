'use client';

import React from 'react';
import clsx from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import CommandRoot, { CommandRootProps } from './CommandRoot';

const COMPONENT_NAME = 'Command';

type DialogPrimitiveRootProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;
type DialogPrimitivePortalProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>;
type DialogPrimitiveOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;
type DialogPrimitiveContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

type CommandDialogElement = React.ElementRef<typeof DialogPrimitive.Content>;

export type CommandDialogProps = Omit<CommandRootProps, 'ref'> & Pick<DialogPrimitiveRootProps, 'open' | 'onOpenChange' | 'onClickOutside'> & {
    container?: DialogPrimitivePortalProps['container'];
    overlayClassName?: string;
    contentClassName?: string;
    forceMount?: boolean;
    contentProps?: Omit<DialogPrimitiveContentProps, 'children' | 'className'>;
    overlayProps?: Omit<DialogPrimitiveOverlayProps, 'className'>;
};

const CommandDialog = React.forwardRef<CommandDialogElement, CommandDialogProps>(({
    children,
    className,
    customRootClass = '',
    open,
    onOpenChange,
    onClickOutside,
    container,
    overlayClassName,
    contentClassName,
    forceMount = false,
    contentProps,
    overlayProps,
    ...props
}, forwardedRef) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    return (
        <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} onClickOutside={onClickOutside}>
            {/* TODO: When forceMount is used for animated command dialogs, closing does not
                restore focus to the trigger yet because the shared dialog focus manager remains mounted. */}
            <DialogPrimitive.Portal container={container} forceMount={forceMount}>
                <DialogPrimitive.Overlay
                    className={clsx(rootClass && `${rootClass}-overlay`, overlayClassName)}
                    data-slot="command-overlay"
                    {...overlayProps}
                />
                <DialogPrimitive.Content
                    ref={forwardedRef}
                    className={clsx(rootClass && `${rootClass}-dialog-content`, contentClassName)}
                    data-slot="command-dialog-content"
                    {...contentProps}
                >
                    <CommandRoot customRootClass={customRootClass} className={className} {...props}>
                        {children}
                    </CommandRoot>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
});

CommandDialog.displayName = 'CommandDialog';

export default CommandDialog;
