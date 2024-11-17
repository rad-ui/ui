import React from 'react';
import CopyPrimitive from '~/core/primitives/Copy';

const COMPONENT_NAME = 'Copy';

const Copy = ({ customRootClass = '', children, isCopiedContent = 'Copied!', resetDelay = 2000, copyContent = '', ...props }: any) => {
    return <CopyPrimitive.Root asChild customRootClass={customRootClass} {...props}>
        <CopyPrimitive.Trigger resetDelay={resetDelay} copyContent={copyContent} >{children}</CopyPrimitive.Trigger>
        <CopyPrimitive.Feedback >
            {isCopiedContent}
        </CopyPrimitive.Feedback>
    </CopyPrimitive.Root>;
};

Copy.displayName = COMPONENT_NAME;
Copy.Root = CopyPrimitive.Root;
Copy.Trigger = CopyPrimitive.Trigger;
Copy.Feedback = CopyPrimitive.Feedback;

export default Copy;
