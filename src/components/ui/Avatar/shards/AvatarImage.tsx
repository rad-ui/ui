import React from 'react';
// @ts-ignore
import {customClassSwitcher} from '@/core';

type AvatarImageProps = {
    src: string;
    alt: string;
    className: string;
    customRootClass: string;
};

const AvatarImage: React.FC<AvatarImageProps> = ({src='src', alt='', customRootClass='', className='', ...props}) => {
    const rootClass = customClassSwitcher(customRootClass, 'Avatar');
    return (
        <img src={src} alt={alt} className={`${rootClass} ${className}`} {...props} />
    );
};

export default AvatarImage;
