'use client';
import React from 'react';

const TextRenderer = ({fallback, ...rest})=>{
    return (
        <div className="rad-ui-avatar rad-ui-avatar-fallback" {...rest} >
            {fallback}
        </div>
    );
};

const Avatar = ({src, alt, ...rest}) => {
    if (!src) {
        return <TextRenderer {...rest} />;
    }

    return (
        <>
            <img
                src={src}
                alt={alt}
                className="rad-ui-avatar"
                {...rest}
            />
        </>
    );
};

export default Avatar;
