import React from 'react';

import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'TextField';

type TextFieldRootProps = React.HTMLAttributes<HTMLDivElement> & {
    className?: string;
    customRootClass?: string;
};

const TextFieldRoot = ({ className = '', customRootClass = '', ...props }: TextFieldRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <div className={`${rootClass} ${className}`} {...props} />;
};

TextFieldRoot.displayName = COMPONENT_NAME;

export default TextFieldRoot;
