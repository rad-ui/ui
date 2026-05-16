'use client';
import React, { ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { createDataAttributes, composeAttributes, createDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'Link';

export interface LinkProps extends ComponentPropsWithoutRef<'a'> {
    customRootClass?: string;
    size?: string;
    color?: string;
    asChild?: boolean;
}

type LinkElement = ElementRef<'a'>;

const Link = React.forwardRef<LinkElement, LinkProps>(
    ({ children, href = '#', customRootClass, className, size = '', color = '', asChild = false, ...props }, ref) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
        const dataAttributes = composeAttributes(
            createDataAttributes('link', { size }),
            createDataAccentColorAttribute(color)
        );
        const Anchor = Primitive.a as any;
        return (
            <Anchor
                ref={ref}
                asChild={asChild}
                href={href}
                className={clsx(rootClass, className)}
                {...dataAttributes}
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
