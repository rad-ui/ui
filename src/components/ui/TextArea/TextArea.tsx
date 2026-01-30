'use client';
import React from 'react';
import clsx from 'clsx';
import TextAreaRoot, { TextAreaRootProps } from './fragments/TextAreaRoot';
import TextAreaInput, { TextAreaInputProps } from './fragments/TextAreaInput';

export type TextAreaProps = React.ComponentPropsWithoutRef<'div'> & TextAreaRootProps & TextAreaInputProps & {
    customRootClass?: string;
    readonly ?: boolean;
    disabled ?: boolean;
};

type TextAreaComponent = React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<React.ElementRef<'div'>>> & {
    Input: typeof TextAreaInput;
    Root: typeof TextAreaRoot;
};

const TextArea = React.forwardRef<React.ElementRef<'div'>, TextAreaProps>(({ customRootClass = '', placeholder = '', className = '', disabled = false, readonly = false, children, ...props }, ref) => {
    return (
        <TextAreaRoot ref={ref} customRootClass={customRootClass} className={clsx(className)} {...props}>
            <TextAreaInput placeholder={placeholder} disabled={disabled} readOnly={readonly}>
                {children}
            </TextAreaInput>
            {children}
        </TextAreaRoot>
    );
}) as TextAreaComponent;

TextArea.displayName = 'TextArea';
TextArea.Input = TextAreaInput;
TextArea.Root = TextAreaRoot;

export default TextArea;
