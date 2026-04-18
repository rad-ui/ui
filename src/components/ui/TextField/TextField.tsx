import React from 'react';
import clsx from 'clsx';

import TextFieldRoot from './fragments/TextFieldRoot';
import TextFieldInput from './fragments/TextFieldInput';
import TextFieldSlot from './fragments/TextFieldSlot';
import TextFieldReset from './fragments/TextFieldReset';

export type TextFieldProps = React.ComponentPropsWithoutRef<'input'> & {
    className?: string;
    customRootClass?: string;
    inputClassName?: string;
    startSlot?: React.ReactNode;
    endSlot?: React.ReactNode;
};

type TextFieldComponent = React.ForwardRefExoticComponent<TextFieldProps & React.RefAttributes<HTMLInputElement>> & {
    Root: typeof TextFieldRoot;
    Input: typeof TextFieldInput;
    Slot: typeof TextFieldSlot;
    Reset: typeof TextFieldReset;
};

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(({ className = '', customRootClass = '', inputClassName = '', startSlot, endSlot, type = 'text', ...props }, ref) => {
    return (
        <TextFieldRoot customRootClass={customRootClass} className={clsx(className)}>
            {startSlot ? <TextFieldSlot side="start">{startSlot}</TextFieldSlot> : null}
            <TextFieldInput ref={ref} type={type} className={clsx(inputClassName)} {...props} />
            {endSlot ? <TextFieldSlot side="end">{endSlot}</TextFieldSlot> : null}
        </TextFieldRoot>
    );
}) as TextFieldComponent;

TextField.displayName = 'TextField';
TextField.Root = TextFieldRoot;
TextField.Input = TextFieldInput;
TextField.Slot = TextFieldSlot;
TextField.Reset = TextFieldReset;

export type { TextFieldRootProps } from './fragments/TextFieldRoot';
export type { TextFieldInputProps } from './fragments/TextFieldInput';
export type { TextFieldSlotProps } from './fragments/TextFieldSlot';
export type { TextFieldResetProps } from './fragments/TextFieldReset';
export default TextField;
