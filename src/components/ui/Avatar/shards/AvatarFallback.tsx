import React from 'react';
// @ts-ignore
import {customClassSwitcher} from '~/core';

export type AvatarFallbackProps = {
    fallback: string,
    customRootClass: string,
};

const AvatarFallback: React.FC<AvatarFallbackProps> = ({fallback='', customRootClass='', ...props}) => {
    const rootClass = customClassSwitcher(customRootClass, 'Avatar');
    return (
        <span className={`${rootClass}-fallback`} {...props} >
            {fallback}
        </span>
    );
};

export default AvatarFallback;
