'use client';
import React from 'react';
import clsx from 'clsx';
import TextAreaRoot from './fragments/TextAreaRoot';
import TextAreaInput from './fragments/TextAreaInput';

export type TextAreaProps = React.ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
};

type TextAreaComponent = React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<React.ElementRef<'div'>>> & {
    Input: typeof TextAreaInput;
    Root: typeof TextAreaRoot;
};

const TextArea = React.forwardRef<React.ElementRef<'div'>, TextAreaProps>(({ customRootClass = '', className = '', children, ...props }, ref) => {
    return (
        <TextAreaRoot ref={ref} customRootClass={customRootClass} className={clsx(className)} {...props}>
            <TextAreaInput placeholder="enter text">
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
