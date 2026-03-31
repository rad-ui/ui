'use client';
import React, { ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { customClassSwitcher } from '~/core';
import { useCreateDataAttribute } from '~/core/hooks/createDataAttribute';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'Link';

export interface LinkProps extends ComponentPropsWithoutRef<'a'> {
    customRootClass?: string;
    detach?: boolean;
    size?: string;
    asChild?: boolean;
}

type LinkElement = ElementRef<'a'>;

const Link = React.forwardRef<LinkElement, LinkProps>(
    ({ children, href = '#', customRootClass, detach = false, className, size = '', asChild = false, ...props }, ref) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME, detach);
        const dataAttributes = useCreateDataAttribute('link', { size });
        const Anchor = Primitive.a as any;
        return (
            <Anchor
                ref={ref}
                asChild={asChild}
                href={href}
                className={clsx(rootClass, className)}
                {...dataAttributes()}
                {...props}
            >
                {children}
            </Anchor>
        );
    }
);

Link.displayName = COMPONENT_NAME;

export default Link;
export type { LinkElement };
