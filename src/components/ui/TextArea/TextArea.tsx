'use client';
import React from 'react';
import clsx from 'clsx';
import TextAreaRoot, { TextAreaRootProps } from './fragments/TextAreaRoot';
import TextAreaInput, { TextAreaInputProps } from './fragments/TextAreaInput';

type RootOnlyProps = Pick<TextAreaRootProps, 'customRootClass' | 'variant' | 'size' | 'resize' | 'color' | 'radius' | 'className' | 'style'>;

export type TextAreaProps = RootOnlyProps & Omit<TextAreaInputProps, 'className' | 'style' | 'color'> & {
    /** @deprecated Use `readOnly`. */
    readonly?: boolean;
};

type TextAreaComponent = React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<React.ElementRef<'div'>>> & {
    Input: typeof TextAreaInput;
    Root: typeof TextAreaRoot;
};

const TextArea = React.forwardRef<React.ElementRef<'div'>, TextAreaProps>(({
    customRootClass = '',
    className = '',
    style,
    variant,
    size,
    resize,
    color,
    radius,
    readonly = false,
    readOnly,
    disabled = false,
    placeholder = '',
    children,
    ...props
}, ref) => {
    // `data-*` attributes stay on the root (the styling hook); every other attribute,
    // including id, name, value, onChange, rows and aria-*, belongs to the native textarea.
    const rootDataAttributes: Record<string, unknown> = {};
    const inputProps: Record<string, unknown> = {};
    Object.entries(props).forEach(([key, value]) => {
        if (key.startsWith('data-')) rootDataAttributes[key] = value;
        else inputProps[key] = value;
    });

    return (
        <TextAreaRoot
            ref={ref}
            customRootClass={customRootClass}
            className={clsx(className)}
            style={style}
            variant={variant}
            size={size}
            resize={resize}
            color={color}
            radius={radius}
            data-disabled={disabled ? '' : undefined}
            {...rootDataAttributes}
        >
            <TextAreaInput
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly ?? readonly}
                {...inputProps}
            >
                {children}
            </TextAreaInput>
        </TextAreaRoot>
    );
}) as TextAreaComponent;

TextArea.displayName = 'TextArea';
TextArea.Input = TextAreaInput;
TextArea.Root = TextAreaRoot;

export type { TextAreaRootProps } from './fragments/TextAreaRoot';
export type { TextAreaInputProps } from './fragments/TextAreaInput';
// Named part exports let React Server Components use `import * as TextArea from '@radui/ui/TextArea'`;
// property access on the default export is undefined across the client boundary.
export {
    TextAreaInput as Input,
    TextAreaRoot as Root
};

export default TextArea;
