import React from 'react';

import TextFieldRoot from './fragments/TextFieldRoot';
import TextFieldInput from './fragments/TextFieldInput';
import TextFieldSlot from './fragments/TextFieldSlot';

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
    customRootClass?: string;
};

const TextField = ({ className = '', customRootClass = '', value, onChange, ...props }: TextFieldProps) => {
    return (
        <TextFieldRoot customRootClass={customRootClass} className={className}>
            <TextFieldSlot>
                slot 1
            </TextFieldSlot>
            {/*  */}
            <TextFieldInput type="text" value={value} onChange={onChange} {...props} />
            {/*  */}
            <TextFieldSlot>
                slot 2
            </TextFieldSlot>
        </TextFieldRoot>
    );
};

export default TextField;
