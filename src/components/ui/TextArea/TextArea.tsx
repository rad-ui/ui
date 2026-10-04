'use client';
import React from 'react';
import clsx from 'clsx';
import TextAreaRoot, { TextAreaRootProps } from './fragments/TextAreaRoot';
import TextAreaInput, { TextAreaInputProps } from './fragments/TextAreaInput';

export type TextAreaProps = TextAreaInputProps & Pick<TextAreaRootProps,
    'customRootClass' | 'variant' | 'size' | 'resize' | 'color' | 'radius'
> & {
    /** Classes are applied to the styled root for backwards compatibility. */
    className?: string;
    /** Styles are applied to the styled root for backwards compatibility. */
    style?: React.CSSProperties;
    readonly?: boolean;
    disabled?: boolean;
};

type TextAreaComponent = React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<React.ElementRef<'div'>>> & {
    Input: typeof TextAreaInput;
    Root: typeof TextAreaRoot;
};

const TextArea = React.forwardRef<React.ElementRef<'div'>, TextAreaProps>(({
    customRootClass = '',
    placeholder = '',
    className = '',
    style,
    disabled = false,
    readonly,
    readOnly,
    children,
    variant,
    size,
    resize,
    color,
    radius,
    ...inputProps
}, ref) => {
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
export default TextArea;
